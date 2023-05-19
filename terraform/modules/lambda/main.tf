resource "aws_security_group" "lambda" {
  name        = local.security_group_name
  description = local.security_group_description
  vpc_id      = var.vpc_id

  dynamic "ingress" {
    for_each = var.vpc_endpoints != [] ? [1] : []
    content {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = flatten([for vpc_endpoint in var.vpc_endpoints : vpc_endpoint.cidr_blocks])
    }
  }

  dynamic "egress" {
    for_each = var.vpc_endpoints != [] ? [1] : []
    content {
      from_port   = 0
      to_port     = 0
      protocol    = "-1"
      cidr_blocks = flatten([for vpc_endpoint in var.vpc_endpoints : vpc_endpoint.cidr_blocks])
    }
  }
}



resource "aws_lambda_function" "this" {
  for_each = var.lambdas

  filename         = each.value.path
  function_name    = each.value.name
  role             = local.lambda_iam_role
  handler          = each.value.handler
  runtime          = each.value.runtime
  source_code_hash = each.value.hash

  dynamic "environment" {
    for_each = length(keys(try(each.value.environment, {}))) > 0 ? [1] : []
    content {
      variables = each.value.environment
    }
  }

  vpc_config {
    subnet_ids         = var.subnet_ids
    security_group_ids = [aws_security_group.lambda.id]
  }

  tags = {
    Name = "lambda-${each.value.name}"
  }
  depends_on = [aws_security_group.lambda]
}

resource "aws_lambda_permission" "this" {
  for_each      = aws_lambda_function.this
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = each.value.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.apigw_execution_arn}/*"
}
