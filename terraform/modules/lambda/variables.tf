variable "lambdas" {
  type = map(map(string))
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}
