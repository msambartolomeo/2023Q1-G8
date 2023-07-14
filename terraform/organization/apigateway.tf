module "apigateway" {
  source = "../modules/apigw"

  name             = local.apigateway.name
  template_file    = local.apigateway.template_file
  stage_name       = local.apigateway.stage_name
  user_pools_names = local.apigateway.user_pools_names
}
