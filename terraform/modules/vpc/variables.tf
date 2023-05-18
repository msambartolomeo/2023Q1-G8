variable "name" {
  type        = string
  description = "Name of the vpc"
}

variable "cidr_block" {
  type        = string
  description = "CIDR block for the vpc"
  default     = "10.0.0.0/16"
}

variable "vpc_endpoints" {
  type        = map(any)
  description = "Data to create vpc endpoints"
}
