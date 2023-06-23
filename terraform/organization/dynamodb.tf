module "dynamodb" {
  for_each = local.dynamodb.tables
  source   = "terraform-aws-modules/dynamodb-table/aws"

  name      = each.value.name
  hash_key  = "pk"
  range_key = "sk"

  billing_mode   = "PROVISIONED"
  read_capacity  = var.dynamodb_read_capacity
  write_capacity = var.dynamodb_write_capacity

  attributes = [
    {
      name = "pk"
      type = "S"
    },
    {
      name = "sk"
      type = "S"
    }
  ]
}
