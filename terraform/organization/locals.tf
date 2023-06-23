locals {
  # VPC
  vpc = {
    name       = var.vpc_name
    cidr_block = var.vpc_cidr_block
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
      path    = "../resources/lambda/lambda.zip"
      hash    = filebase64sha256("../resources/lambda/lambda.zip")
      handler = "lambda.handler"
      runtime = "python3.9"
    },
    getUser = {
      name    = "getUser"
      path    = "../resources/lambda/getUser.zip"
      hash    = filebase64sha256("../resources/lambda/getUser.zip")
      handler = "getUser.handler"
      runtime = "python3.9"
    }
    getHistory = {
      name    = "getHistory"
      path    = "../resources/lambda/getHistory.zip"
      hash    = filebase64sha256("../resources/lambda/getHistory.zip")
      handler = "getHistory.handler"
      runtime = "python3.9"
      environment = {
        BUCKET_NAME = module.s3["records"].bucket_id
      }
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
        "/api/test" = {
          get = {
            x-amazon-apigateway-integration = {
              httpMethod           = "POST"
              payloadFormatVersion = "1.0"
              type                 = "aws_proxy"
              uri                  = module.lambda.lambdas["lambda"].invoke_arn
            }
          }
        },
        "/api/users" = {
          get = {
            x-amazon-apigateway-integration = {
              httpMethod           = "POST"
              payloadFormatVersion = "1.0"
              type                 = "aws_proxy"
              uri                  = module.lambda.lambdas["getUser"].invoke_arn
            }
          }
        }
        "/api/history" = {
          get = {
            x-amazon-apigateway-integration = {
              httpMethod           = "POST"
              payloadFormatVersion = "1.0"
              type                 = "aws_proxy"
              uri                  = module.lambda.lambdas["getHistory"].invoke_arn
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

  # S3

  s3 = {
    website = {
      bucket_name          = var.website_bucket_name
      encription_algorithm = "AES256"
      objects = [
        for file in fileset("../resources/html/", "**/*.html") : {
          key          = file
          source       = "../resources/html/${file}"
          etag         = filemd5("../resources/html/${file}")
          content_type = "text/html"
        }
      ]
      website_configuration = {
        index_document = "index.html"
        error_document = "error.html"
      }
      acl_type = "private"
    }
    website_logs = {
      bucket_name          = "${var.website_bucket_name}-logs"
      encription_algorithm = "AES256"
      log_of               = var.website_bucket_name
      acl_type             = "log-delivery-write"
    }
    records = {
      bucket_name          = var.records_bucket_name
      encription_algorithm = "AES256"
      # NOTE: Example record for testing
      objects = [
        for file in fileset("../resources/medical-records/", "**/*.pdf") : {
          key          = file
          source       = "../resources/medical-records/${file}"
          etag         = filemd5("../resources/medical-records/${file}")
          content_type = "application/pdf"
        }
      ]
      acl_type = "private"
    }
  }
}
