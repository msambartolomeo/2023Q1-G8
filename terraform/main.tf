module "vpc" {
  source = "./modules/vpc"
}

module "lambda" {
  source = "./modules/lambda"

  lambdas             = local.lambdas
  vpc_id              = module.vpc.vpc.id
  subnet_ids          = [for s in module.vpc.vpc.subnets : s.id]
  apigw_execution_arn = module.apigateway.execution_arn
}

module "s3" {
  source = "./modules/s3"
  CDN_OAI = [module.cloudfront.OAI]
}

module "cloudfront" {
  source                      = "./modules/cdn"
  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  bucket_id                   = module.s3.bucket_id
  bucket_name                 = module.s3.bucket_id
  apigw_invoke_url = module.apigateway.invoke_url
}

module "apigateway" {
  source     = "./modules/apigw"
  lambda_arn = module.lambda.invoke_arn[0]
}
