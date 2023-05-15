output "bucket_regional_domain_name" {
  value = aws_s3_bucket.cloud_website.bucket_regional_domain_name
}

output "bucket_domain_name" {
  value = aws_s3_bucket.cloud_website.bucket_domain_name
}

output "website_endpoint" {
  value = aws_s3_bucket_website_configuration.website_config.website_endpoint
}

output "bucket_arn" {
  value = aws_s3_bucket.cloud_website.arn
}

output "bucket_id" {
  description = "bucket id"
  value       = aws_s3_bucket.cloud_website.id
}
