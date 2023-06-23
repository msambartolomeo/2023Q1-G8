data "aws_availability_zones" "available" {
  state = "available"
}

locals {
  availability_zones = data.aws_availability_zones.available.names
  zones_count        = length(data.aws_availability_zones.available.names)
}
