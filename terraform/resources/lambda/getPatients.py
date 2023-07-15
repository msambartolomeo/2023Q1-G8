import base64
import json
import logging
import os

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)


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
        if authorizedEmail != email:
            raise Exception
    except:
        return {"statusCode": 403}

    try:
        response = dynamo.query(
            TableName="doctors-table",
            KeyConditionExpression="#pk = :pk",
            ExpressionAttributeNames={"#pk": "pk"},
            ExpressionAttributeValues={":pk": {"S": email}},
        )
        items = response["Items"]
    except:
        return {"statusCode": 404}

    items = [item["sk"]["S"] for item in items]

    return {
        "statusCode": 200,
        "body": json.dumps(items),
        "headers": {
            "Content-Type": "application/json",
        },
    }
