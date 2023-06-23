output "execution_arn" {
  description = "The execution ARN of the API GateWay"
  value       = aws_api_gateway_rest_api.this.execution_arn
}

output "invoke_url" {
  description = "The invoke ARN of the API GateWay"
  value       = aws_api_gateway_stage.this.invoke_url
}
