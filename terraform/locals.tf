locals {
  vpc = {
    name = "main-vpc"
    endpoints = {
      s3 = {
        service_name  = "com.amazonaws.${var.aws_region}.s3"
        endpoint_name = "s3-vpc-endpoint"
      }
      dynamodb = {
        service_name  = "com.amazonaws.${var.aws_region}.dynamodb"
        endpoint_name = "dynamodb-vpc-endpoint"
      }
    }
  }

  # Lambda
  lambdas = {
    lambda = {
      name    = "lambda"
      path    = "./resources/lambda/lambda.zip"
      hash    = filebase64sha256("./resources/lambda/lambda.zip")
      handler = "lambda.handler"
      runtime = "python3.9"
    },
    lambdaDB = {
      name    = "lambdaDB"
      path    = "./resources/lambda/lambdaDB.zip"
      hash    = filebase64sha256("./resources/lambda/lambdaDB.zip")
      handler = "lambdaDB.handler"
      runtime = "python3.9"
    }
  }

  # api gateway
  apigateway = {
    name       = "api-gw"
    stage_name = "prodction"
    base_path  = "api"
    template_file = jsonencode({
      openapi : "3.0.1"
      info = {
        title   = "Api-Gateway"
        version = "1.0"
      }
      paths = {
        "/api/medical-records" = {
          get = {
            x-amazon-apigateway-integration = {
              httpMethod           = "POST"
              payloadFormatVersion = "1.0"
              type                 = "aws_proxy"
              uri                  = module.lambda.lambdas["lambda"].invoke_arn
            }
          }
        },
        "/api/scan-db" = {
          get = {
            x-amazon-apigateway-integration = {
              httpMethod           = "POST"
              payloadFormatVersion = "1.0"
              type                 = "aws_proxy"
              uri                  = module.lambda.lambdas["lambdaDB"].invoke_arn
            }
          }
        }
    } })

  }

  # Dynamodb
  dynamodb = {
    tables = {
      patients = {
        name = "patients-table"
      }
      doctors = {
        name = "doctors-table"
      }
    }
    read_capacity  = 5
    write_capacity = 5
  }
}
