resource "aws_api_gateway_rest_api" "self" {
  name        = local.name
  description = local.description

  body = local.template_file

  tags = {
    name = local.name
  }
}

resource "aws_api_gateway_deployment" "self" {
  rest_api_id = aws_api_gateway_rest_api.self.id

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.self.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "self" {
  deployment_id = aws_api_gateway_deployment.self.id
  rest_api_id   = aws_api_gateway_rest_api.self.id
  stage_name    = "prod"
}
