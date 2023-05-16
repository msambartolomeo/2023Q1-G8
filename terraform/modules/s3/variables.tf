variable "bucket_name" {
  type        = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
  default = "cloud-g8"
}

variable "bucket__prefix" {
  type        = string
  description = "The name of the bucket prefix."
  default     = "cloud-website-prefix"
}

variable "CDN_OAI" {
  description = "OAI of authorized bucket accessors"
  type        = list(string)
}
