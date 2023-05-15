locals {
  name = "api-gw"
  description = "hola"
  template_file =  jsonencode({
    openapi: "3.0.1"
    info = {
      title   = "Example"
      version = "1.0"
    }
    paths = {
      "/medical-records" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "aws_proxy"
            uri                  = var.lambda_arn
          }
        }
        /*
        post = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "aws_proxy"
            uri                  = module.lambda["new-medical-record"].invoke_arn
          }
        }
        */
        
      }
      /*
       "/appointments" = {
        get = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "aws_proxy"
            uri                  = module.lambda["get-appointment"].invoke_arn
          }
        }
        post = {
          x-amazon-apigateway-integration = {
            httpMethod           = "POST"
            payloadFormatVersion = "1.0"
            type                 = "aws_proxy"
            uri                  = module.lambda["post-appointment"].invoke_arn
          }
        }
      }
      */
     

    }
  })

}

