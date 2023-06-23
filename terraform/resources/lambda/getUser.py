import json
import logging

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

client = boto3.client("dynamodb")


def handler(event, context):
    logger.info("Executing Lambda function...")

    data = client.scan(TableName="patients-table")

    logger.info("Querying DynamoDB table...")

    response = {
        "statusCode": 200,
        "body": json.dumps(data),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    }

    logger.info("Returning response...")

    return response
