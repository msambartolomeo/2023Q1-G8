import base64
import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.client("s3")

dynamo = boto3.client("dynamodb")


def handler(event, context):
    bucket_name = os.environ.get("BUCKET_NAME")

    userId = event["pathParameters"]["userId"]
    try:
        body = json.loads(event["body"])
        key = body["path"]
        email = base64.b64decode(userId.encode("utf-8")).decode("utf-8")
    except:
        return {"statusCode": 400, "body": json.dumps("Path parameter must be base64")}

    try:
        authorizedEmail = event["requestContext"]["authorizer"]["claims"]["email"]
        # check if it is doctor's email
        item = dynamo.get_item(
            TableName="doctors-table",
            Key={
                "pk": {"S": authorizedEmail},
                "sk": {"S": userId},
            },
        )["Item"]
        if not item:
            raise Exception
    except:
        return {"statusCode": 403}

    try:
        dynamo.update_item(
            TableName="patients-table",
            Key={
                "pk": {"S": userId},
                "sk": {"S": email},
            },
            UpdateExpression="SET #path = :new_file_key",
            ExpressionAttributeNames={"#path": "path"},
            ExpressionAttributeValues={":new_file_key": {"S": key}},
        )
        url = s3.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": bucket_name,
                "Key": key,
                "ContentType": "application/pdf",
            },
            ExpiresIn=20,
        )
    except:
        return {"statusCode": 500}

    return {
        "statusCode": 200,
        "body": json.dumps({"signedUrl": url}),
        "headers": {
            "Content-Type": "application/json",
        },
    }
