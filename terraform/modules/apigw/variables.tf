variable "template_file" {
  type        = string
  description = "Template file to generate the api routes encoded in json"
}

variable "stage_name" {
  type        = string
  description = "Stage name to deploy this API-GW"
}

variable "name" {
  type = string
  description = "API-GW name"
}
