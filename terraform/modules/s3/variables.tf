variable "bucket_name" {
  type        = string
  description = "The name of the bucket"
}

variable "website_configuration" {
  type        = map(any)
  description = "Configuration to create a website"
  default     = {}
}

variable "objects" {
  type        = list(any)
  description = "objects to insert into bucket"
  default     = []
}

variable "encription_algorithm" {
  type        = string
  description = "Encription algorithm to use for bucket"
}

variable "access_ids" {
  type        = list(string)
  description = "ids of elements that will have read access to the bucket"
}
