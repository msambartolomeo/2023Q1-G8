locals {
  # Lambda
  lambdas = {
    lambda = {
      name    = "lambda"
      path    = "./resources/lambda.zip"
      handler = "lambda.lambda_handler"
      runtime = "python3.9"
    }
  }
}
