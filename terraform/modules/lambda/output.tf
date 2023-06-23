output "lambdas" {
  description = "Invoke arns of the lambdas indexable by name"
  value = { for l in aws_lambda_function.this :
    l.function_name => {
      invoke_arn = l.invoke_arn
    }
  }
}
