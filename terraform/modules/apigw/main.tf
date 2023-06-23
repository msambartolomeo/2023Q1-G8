resource "aws_api_gateway_rest_api" "this" {
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

resource "aws_api_gateway_deployment" "this" {
  rest_api_id = aws_api_gateway_rest_api.this.id

  triggers = {
    redeployment = sha1(var.template_file)
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.this.id
  stage_name    = var.stage_name
}
