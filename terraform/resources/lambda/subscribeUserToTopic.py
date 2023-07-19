import base64

import boto3

dynamo = boto3.client("dynamodb")

sns = boto3.client("sns")


def handler(event, context):
    email = event["request"]["userAttributes"]["email"]
    userId = base64.b64encode(email.encode("utf-8")).decode("utf-8")

    topic_name = userId.rstrip("=")
    response = sns.create_topic(Name=topic_name)
    topic_arn = response["TopicArn"]
    response = sns.subscribe(TopicArn=topic_arn, Protocol="email", Endpoint=email)

    dynamo.update_item(
        TableName="patients-table",
        Key={
            "pk": {"S": userId},
            "sk": {"S": email},
        },
        UpdateExpression="SET #topic = :new_topic",
        ExpressionAttributeNames={"#topic": "topic"},
        ExpressionAttributeValues={":new_topic": {"S": topic_arn}},
    )

    return event
