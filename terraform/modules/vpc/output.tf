output "name" {
  description = "The name of the vpc"
  value       = aws_vpc.this.tags["Name"]
}

output "id" {
  description = "Id of the vpc"
  value       = aws_vpc.this.id
}

output "subnets" {
  description = "Information about the private subnets"
  value = [
    for subnet in aws_subnet.this : {
      name = subnet.tags["Name"]
      id   = subnet.id
      az   = subnet.availability_zone
      cidr = subnet.cidr_block
    }
  ]
}

output "vpc_endpoints" {
  description = "Information about the vpc_endpoints"
  value       = [for e in aws_vpc_endpoint.this : e]
}
