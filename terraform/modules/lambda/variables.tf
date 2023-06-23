variable "lambdas" {
  type        = any
  description = "Lambda functions to create"
}

variable "vpc_id" {
  type        = string
  description = "Id of the vpc where the lambda will be created"
}

variable "subnet_ids" {
  type        = list(string)
  description = "Ids of the subnets where the lambda functions will be created"
}

variable "apigw_execution_arn" {
  type        = string
  description = "Arn of the api-gw to grant it permision to execute the lambdas"
}

variable "vpc_endpoints" {
  type        = list(any)
  description = "Information of the vpc endpoints to grant access to them from the lambdas"
}
