variable "bucket_name" {
  type        = string
  description = "The name of the bucket"
}

variable "CDN_OAI" {
  type        = string
  description = "OAI of authorized bucket accessors"
}

variable "objects" {
  type        = list(any)
  description = "objects to insert into bucket"
  default     = []
}
