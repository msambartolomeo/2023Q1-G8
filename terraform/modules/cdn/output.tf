output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.this.domain_name
}

output "OAI" {
  value = aws_cloudfront_origin_access_identity.this.iam_arn
}
