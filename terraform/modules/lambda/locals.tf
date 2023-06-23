data "aws_iam_role" "lambda" {
  name = "LabRole"
}

locals {
  security_group_name        = "lambda-sg"
  security_group_description = "Generic Lambda Security Group"
  lambda_iam_role            = data.aws_iam_role.lambda.arn
}
