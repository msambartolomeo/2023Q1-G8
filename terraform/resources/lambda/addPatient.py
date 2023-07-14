import base64
import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamo = boto3.client("dynamodb")


def handler(event, context):
    try:
        body = json.loads(event["body"])
        email = body["email"]
        userId = base64.b64encode(email.encode("utf-8")).decode("utf-8")
    except:
        return {"statusCode": 400}

    try:
        dynamo.put_item(
            TableName="patients-table",
            Item={
                "pk": {"S": userId},
                "sk": {"S": email},
                "path": {"S": ""},
            },
            ConditionExpression="attribute_not_exists(pk) AND attribute_not_exists(sk)",
        )
    except:
        return {"statusCode": 409}

    return {"statusCode": 201}
