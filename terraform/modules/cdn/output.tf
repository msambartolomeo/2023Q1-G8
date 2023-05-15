output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "OAI"{
  value = aws_cloudfront_origin_access_identity.CDN_OAI.iam_arn
}

output "cloudfront_distro"{
  description = "The cloudfront distribution for the deployment"
  value = aws_cloudfront_distribution.s3_distribution
}

output "etag" {
  value = aws_cloudfront_distribution.s3_distribution.etag
}

output "arn" {
  value = aws_cloudfront_distribution.s3_distribution.arn
}

output "id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}