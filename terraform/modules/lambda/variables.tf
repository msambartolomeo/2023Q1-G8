variable "lambdas" {
  type = map(map(string))
}

variable "runtime" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}
