locals {
  # Lambda
  lambdas = {
    lambda = {
      name    = "lambda"
      path    = "./resources/lambda/lambda.zip"
      hash    = filebase64sha256("./resources/lambda/lambda.zip")
      handler = "lambda.handler"
      runtime = "python3.9"
    }
  }
}
