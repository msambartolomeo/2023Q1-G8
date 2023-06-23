module "cloudfront" {
  source = "../modules/cdn"

  bucket_regional_domain_name = module.s3["website"].bucket_regional_domain_name
  bucket_name                 = module.s3["website"].bucket_id
  apigw_invoke_url            = module.apigateway.invoke_url
  apigw_base_path             = local.apigateway.base_path
  apigw_stage                 = "/${local.apigateway.stage_name}"
}
