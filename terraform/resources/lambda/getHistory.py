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
    email = base64.b64decode(userId.encode("utf-8")).decode("utf-8")

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
            "get_object", Params={"Bucket": bucket_name, "Key": file_key}, ExpiresIn=100
        )
        message = f'File "{file_key}" found in bucket "{bucket_name}"'
        logger.info(message)
    except Exception as e:
        return {"statusCode": 404}

    return {
        "statusCode": 200,
        "body": json.dumps({"url": url, "event": event}),
        "headers": {
            "Content-Type": "application/json",
        },
    }
