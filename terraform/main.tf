module "vpc" {
  source = "./modules/vpc"

  name          = local.vpc.name
  cidr_block    = local.vpc.cidr_block
  vpc_endpoints = local.vpc.endpoints
}

module "lambda" {
  source = "./modules/lambda"

  lambdas             = local.lambdas
  vpc_id              = module.vpc.id
  subnet_ids          = [for s in module.vpc.subnets : s.id]
  apigw_execution_arn = module.apigateway.execution_arn
  vpc_endpoints       = module.vpc.vpc_endpoints
}

module "s3" {
  for_each = local.s3
  source   = "./modules/s3"

  access_ids            = [module.cloudfront.OAI]
  bucket_name           = each.value.bucket_name
  objects               = each.value.objects
  website_configuration = try(each.value.website_configuration, {})
  encription_algorithm  = each.value.encription_algorithm
}

module "apigateway" {
  source = "./modules/apigw"

  name          = local.apigateway.name
  template_file = local.apigateway.template_file
  stage_name    = local.apigateway.stage_name
}

module "cloudfront" {
  source = "./modules/cdn"

  bucket_regional_domain_name = module.s3["website"].bucket_regional_domain_name
  bucket_name                 = module.s3["website"].bucket_id
  apigw_invoke_url            = module.apigateway.invoke_url
  apigw_base_path             = local.apigateway.base_path
  apigw_stage                 = "/${local.apigateway.stage_name}"
}

module "dynamodb" {
  for_each = local.dynamodb.tables
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = each.value.name
  hash_key  = "pk"
  range_key = "sk"

  billing_mode   = "PROVISIONED"
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity

  attributes = [
    {
      name = "pk"
      type = "S"
    },
    {
      name = "sk"
      type = "S"
    }
  ]
}
