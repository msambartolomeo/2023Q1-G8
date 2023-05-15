import json


def handler(event, context):
    response = {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": {
            "message": "Hello, world!",
            "data": {"key1": "value1", "key2": "value2"},
        },
    }

    return {
        "statusCode": response["statusCode"],
        "headers": response["headers"],
        "body": json.dumps(response["body"]),
    }
