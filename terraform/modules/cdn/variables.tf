
variable "bucket_regional_domain_name" {
  type        = string
  description = "Domain name of the frontend S3 bucket"
}

variable "bucket_name" {
  type        = string
  description = "Name of the frontend S3 bucket"
}

variable "apigw_invoke_url" {
  type        = string
  description = "Url for Cloudfront to call the API-GW"
}

variable "apigw_base_path" {
  type        = string
  description = "Base path of the API-GW"
}

variable "apigw_stage" {
  type        = string
  description = "Stage prefix of the API-GW"
}
