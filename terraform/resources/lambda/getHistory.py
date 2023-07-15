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
        email = base64.b64decode(userId.encode("utf-8")).decode("utf-8")
    except:
        return {"statusCode": 400, "body": json.dumps("Path parameter must be base64")}

    try:
        authorizedEmail = event["requestContext"]["authorizer"]["claims"]["email"]
        logger.info(authorizedEmail)
        if authorizedEmail != email:
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
        item = dynamo.get_item(
            TableName="patients-table",
            Key={
                "pk": {"S": userId},
                "sk": {"S": email},
            },
        )["Item"]
        file_key = item["path"]["S"]
    except:
        return {"statusCode": 404}

    try:
        url = s3.generate_presigned_url(
            "get_object", Params={"Bucket": bucket_name, "Key": file_key}, ExpiresIn=20
        )
        message = f'File "{file_key}" found in bucket "{bucket_name}"'
        logger.info(message)
    except Exception as e:
        return {"statusCode": 404}

    return {
        "statusCode": 200,
        "body": json.dumps({"url": url}),
        "headers": {
            "Content-Type": "application/json",
        },
    }
