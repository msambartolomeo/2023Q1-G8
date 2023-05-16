
variable "bucket_regional_domain_name" {
  description = "target domain name of the S3 bucket"
  type        = string
}

variable "bucket_id" {
  description = "target domain name of the S3 bucket"
  type        = string
}

variable "bucket_name" {
  type        = string
  description = "the bucket's name"
}

variable "apigw_invoke_url" {
  description = "you need this to connect the cdn to the api gateway"
  type        = string
}

variable "apigw_origin_id" {
  type        = string
  description = "origin_id for the api gateway connection"
  default     = "apiOrigin"
}
