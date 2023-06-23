output "cloudfront_domain_name" {
  description = "Domain to access cloudfront from"
  value       = aws_cloudfront_distribution.this.domain_name
}

output "OAI" {
  description = "OAI form cloudfront"
  value       = aws_cloudfront_origin_access_identity.this.iam_arn
}
