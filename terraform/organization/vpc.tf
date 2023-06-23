module "vpc" {
  source = "../modules/vpc"

  name          = local.vpc.name
  cidr_block    = local.vpc.cidr_block
  vpc_endpoints = local.vpc.endpoints
}
