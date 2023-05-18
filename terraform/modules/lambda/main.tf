resource "aws_security_group" "lambda" {
  name        = local.security_group_name
  description = "Generic Lambda Security Group"
  vpc_id      = var.vpc_id

  # TODO: add rules if needed
  ingress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

data "aws_iam_role" "lambda" {
  name = "LabRole"
}

resource "aws_lambda_function" "this" {
  for_each = var.lambdas

  filename         = each.value.path
  function_name    = each.value.name
  role             = data.aws_iam_role.lambda.arn
  handler          = each.value.handler
  runtime          = each.value.runtime
  source_code_hash = each.value.hash

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
