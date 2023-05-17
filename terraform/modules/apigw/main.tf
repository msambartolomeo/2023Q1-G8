resource "aws_api_gateway_rest_api" "self" {
  name = var.name

  body = var.template_file

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    name        = var.name
    environment = var.stage_name
  }
}

resource "aws_api_gateway_deployment" "self" {
  rest_api_id = aws_api_gateway_rest_api.self.id

  triggers = {
    redeployment = sha1(var.template_file)
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "self" {
  deployment_id = aws_api_gateway_deployment.self.id
  rest_api_id   = aws_api_gateway_rest_api.self.id
  stage_name    = var.stage_name
}
