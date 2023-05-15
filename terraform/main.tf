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

module "s3" {
  source = "./modules/s3"

  bucket_name = var.bucket_name
  domain_name = var.domain_name
  #account_id = var.account_id
  CDN_OAI = [module.cloudfront.OAI]
}

module "cloudfront" {
  source = "./modules/cdn"
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  bucket_id = module.s3.bucket_id
  bucket_name = module.s3.bucket_id
}

module "apigateway"{
  source = "./modules/apigw"
  lambda_arn = module.lambda.invoke_arn[0]
}