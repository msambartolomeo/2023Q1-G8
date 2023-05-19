variable "aws_region" {
  type        = string
  description = "AWS Region in which to deploy the application"
}

variable "vpc_name" {
  type        = string
  description = "Name of the main vpc of the aplication"
  default     = "main-vpc"
}

variable "vpc_cidr_block" {
  type        = string
  description = "cidr block for the main vpc of the application"
  default     = "10.0.0.0/16"
}

variable "dynamodb_read_capacity" {
  type        = number
  description = "Read capacity for dynamoDB"
}

variable "dynamodb_write_capacity" {
  type        = number
  description = "Write capacity for dynamoDB"
}
