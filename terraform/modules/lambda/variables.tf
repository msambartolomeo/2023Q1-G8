variable "lambdas" {
  type = any
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "apigw_execution_arn" {
  type = string
}

variable "vpc_endpoints" {
  type = list(any)
}
