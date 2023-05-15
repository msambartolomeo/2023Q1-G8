output "invoke_arn" {
  description = "The lambda function's invoke ARN"
  value       = [for l in aws_lambda_function.self: l.invoke_arn]
}

output "function_name" {
  description = "The lambda function's name"
  value       = [for l in aws_lambda_function.self: l.function_name]
}