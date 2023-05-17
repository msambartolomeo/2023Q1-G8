output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.self.domain_name
}

output "OAI" {
  value = aws_cloudfront_origin_access_identity.self.iam_arn
}
