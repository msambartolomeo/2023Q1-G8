resource "aws_security_group" "lambda" {
  name        = local.security_group_name
  description = "Generic Lambda Security Group"
  vpc_id      = var.vpc_id

  # TODO: add rules if needed
}

data "aws_iam_role" "lambda" {
  name = "LabRole"
}

resource "aws_lambda_function" "self" {
  for_each = var.lambdas

  filename      = each.value.path
  function_name = each.value.name
  role          = data.aws_iam_role.lambda.arn
  handler       = each.value.handler
  runtime       = var.runtime

  vpc_config {
    subnet_ids         = var.subnet_ids
    security_group_ids = [aws_security_group.lambda.id]
  }

  tags = {
    Name = "lambda-${each.value.name}"
  }

  depends_on = [aws_security_group.lambda]
}
