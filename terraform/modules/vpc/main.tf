resource "aws_vpc" "self" {
  cidr_block = var.cidr_block

  tags = {
    Name = var.name
  }
}

resource "aws_subnet" "self" {
  count = local.zones_count

  vpc_id            = aws_vpc.self.id
  cidr_block        = cidrsubnet(var.cidr_block, 8, count.index)
  availability_zone = local.availability_zones[count.index]

  tags = {
    Name = "private-${count.index}"
  }
}

resource "aws_vpc_endpoint" "this" {
  for_each = var.vpc_endpoints

  vpc_id       = aws_vpc.self.id
  service_name = each.value.service_name

  route_table_ids = [aws_vpc.self.default_route_table_id]
}
