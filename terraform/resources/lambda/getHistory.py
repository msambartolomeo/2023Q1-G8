import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3 = boto3.client("s3")


def handler(event, context):
    logger.info("Executing Lambda function...")

    bucket_name = os.environ.get("BUCKET_NAME")
    file_key = "record.pdf"

    try:
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        message = f'File "{file_key}" found in bucket "{bucket_name}"'
        logger.info(message)
        data = {"status": "success", "message": message}
    except Exception as e:
        error_message = str(e)
        logger.error(error_message)
        data = {"status": "error", "message": error_message}

    logger.info("Returning response...")

    return {
        "statusCode": 200,
        "body": json.dumps(data),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    }
