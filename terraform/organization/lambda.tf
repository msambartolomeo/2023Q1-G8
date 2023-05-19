module "lambda" {
  source = "../modules/lambda"

  lambdas             = local.lambdas
  vpc_id              = module.vpc.id
  subnet_ids          = [for s in module.vpc.subnets : s.id]
  apigw_execution_arn = module.apigateway.execution_arn
  vpc_endpoints       = module.vpc.vpc_endpoints
}
