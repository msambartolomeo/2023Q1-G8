import base64
import logging
import urllib.parse

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

sns = boto3.client("sns")

dynamo = boto3.client("dynamodb")


def handler(event, context):
    s3_key = event["Records"][0]["s3"]["object"]["key"]

    userId = s3_key.split("/")[0]
    userId = urllib.parse.unquote(userId)
    email = base64.b64decode(userId.encode("utf-8")).decode("utf-8")

    item = dynamo.get_item(
        TableName="patients-table",
        Key={
            "pk": {"S": userId},
            "sk": {"S": email},
        },
    )["Item"]
    topic_arn = item["topic"]["S"]

    sns.publish(
        TopicArn=topic_arn,
        Message="Tenes un nuevo registro medico",
    )

    return event
