resource "aws_vpc" "self" {
  cidr_block = local.vpc_cidr_block

  tags = {
    Name = local.vpc_name
  }
}

resource "aws_subnet" "self" {
  count = local.zones_count

  vpc_id            = aws_vpc.self.id
  cidr_block        = cidrsubnet(local.vpc_cidr_block, 8, count.index)
  availability_zone = local.availability_zones[count.index]

  tags = {
    Name = "private-${count.index}"
  }
}
