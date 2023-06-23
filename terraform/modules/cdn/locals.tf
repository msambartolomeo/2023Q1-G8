locals {
  apigw_id           = "${var.apigw_stage}_${var.apigw_base_path}"
  bucket_domain_name = replace(var.apigw_invoke_url, "/^https?://([^/]*).*/", "$1")
}
