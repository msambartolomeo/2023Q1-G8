module "vpc" {
  source = "./modules/vpc"

  name = local.vpc.name
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

module "apigateway" {
  source = "./modules/apigw"

  name          = local.apigateway.name
  template_file = local.apigateway.template_file
  stage_name    = local.apigateway.stage_name
}

module "cloudfront" {
  source = "./modules/cdn"

  bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  bucket_name                 = module.s3.bucket_id
  apigw_invoke_url            = module.apigateway.invoke_url
  apigw_base_path             = local.apigateway.base_path
  apigw_stage                 = "/${local.apigateway.stage_name}"
}
