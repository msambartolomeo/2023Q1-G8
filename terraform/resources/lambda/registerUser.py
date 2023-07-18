import base64
import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamo = boto3.client("dynamodb")

sns = boto3.client("sns")


def handler(event, context):
    email = event["request"]["userAttributes"]["email"]
    userId = base64.b64encode(email.encode("utf-8")).decode("utf-8")

    response = dynamo.get_item(
        TableName="patients-table",
        Key={
            "pk": {"S": userId},
            "sk": {"S": email},
        },
    )
    logger.info(response)
    if "Item" not in response:
        raise Exception("The Email provided was never registered by a doctor")

    return event
