output "vpc" {
  value = {
    name = aws_vpc.this.tags["Name"]
    id   = aws_vpc.this.id
    subnets = [
      for subnet in aws_subnet.this : {
        name = subnet.tags["Name"]
        id   = subnet.id
        az   = subnet.availability_zone
        cidr = subnet.cidr_block
      }
    ]
    vpc_endpoints = [for e in aws_vpc_endpoint.this : e]
  }
}
