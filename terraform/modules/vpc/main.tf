resource "aws_vpc" "this" {
  cidr_block = var.cidr_block

  tags = {
    Name = var.name
  }
}

resource "aws_subnet" "this" {
  count = local.zones_count

  vpc_id            = aws_vpc.this.id
  cidr_block        = cidrsubnet(var.cidr_block, 8, count.index)
  availability_zone = local.availability_zones[count.index]

  tags = {
    Name = "private-${count.index}"
  }
}

resource "aws_vpc_endpoint" "this" {
  for_each = var.vpc_endpoints

  vpc_id       = aws_vpc.this.id
  service_name = each.value.service_name

  route_table_ids = [aws_vpc.this.default_route_table_id]
}
