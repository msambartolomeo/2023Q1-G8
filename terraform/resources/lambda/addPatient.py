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
    except:
        return {"statusCode": 400}

    try:
        dynamo.put_item(
            TableName="patients-table",
            Item={
                "pk": {"S": email},
                "sk": {"S": "RECORD_PATH"},
                "path": {"S": ""},
            },
            ConditionExpression="attribute_not_exists(pk) AND attribute_not_exists(sk)",
        )
    except:
        return {"statusCode": 409}

    logger.info(response)

    return {"statusCode": 201}
