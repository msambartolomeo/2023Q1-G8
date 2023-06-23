output "bucket_regional_domain_name" {
  value = aws_s3_bucket.this.bucket_regional_domain_name
}

output "bucket_domain_name" {
  value = aws_s3_bucket.this.bucket_domain_name
}

output "website_endpoint" {
  description = "The website endpoint, if the bucket is a website"
  value       = length(aws_s3_bucket_website_configuration.this) > 0 ? aws_s3_bucket_website_configuration.this[0].website_endpoint : ""
}

output "bucket_arn" {
  value = aws_s3_bucket.this.arn
}

output "bucket_id" {
  description = "bucket id"
  value       = aws_s3_bucket.this.id
}
