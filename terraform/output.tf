output "vpc" {
  value = module.vpc.vpc
}

output "s3" {
  value = module.s3
}

output "cloudfront" {
  value = module.cloudfront.cloudfront_domain_name
}
