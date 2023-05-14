module "vpc" {
  source = "./modules/vpc"
}

module "lambda" {
  source = "./modules/lambda"

  lambdas = {
    lambda = {
      name    = "lambda"
      path    = "./resources/lambda.zip"
      handler = "lambda.lambda_handler"
  } }

  runtime = "python3.9"

  vpc_id = module.vpc.vpc.id

  subnet_ids = [for s in module.vpc.vpc.subnets : s.id]
}
