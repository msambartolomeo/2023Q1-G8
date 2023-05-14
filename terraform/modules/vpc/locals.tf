data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  vpc_name           = "main-vpc"
  vpc_cidr_block     = "10.0.0.0/16"
  availability_zones = data.aws_availability_zones.available.names
  zones_count        = length(data.aws_availability_zones.available.names)
}
