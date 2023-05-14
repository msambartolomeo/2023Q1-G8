output "vpc" {
  value = {
    name = aws_vpc.self.tags["Name"]
    id   = aws_vpc.self.id
    subnets = [
      for subnet in aws_subnet.self : {
        name = subnet.tags["Name"]
        id   = subnet.id
        az   = subnet.availability_zone
        cidr = subnet.cidr_block
      }
    ]
  }
}
