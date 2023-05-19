resource "aws_s3_bucket" "this" {
  bucket_prefix = var.bucket__prefix

  tags = {
    Name : var.bucket_name
  }
}

resource "aws_s3_bucket_website_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.this.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_acl" "this" {
  bucket = aws_s3_bucket.this.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "this" {
  bucket = aws_s3_bucket.this.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {

    principals {
      type        = "AWS"
      identifiers = var.CDN_OAI
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      aws_s3_bucket.this.arn,
      "${aws_s3_bucket.this.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "cloudfront_policy" {
  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

# TODO: make this pretty
resource "aws_s3_object" "html" {
  for_each = fileset("./resources/html/", "**/*.html")

  bucket       = aws_s3_bucket.this.id
  key          = each.value
  source       = "./resources/html/${each.value}"
  etag         = filemd5("./resources/html/${each.value}")
  content_type = "text/html"
}

resource "aws_s3_object" "css" {
  for_each = fileset("./resources/css/", "**/*.css")

  bucket       = aws_s3_bucket.this.id
  key          = each.value
  source       = "./resources/css/${each.value}"
  etag         = filemd5("./resources/css/${each.value}")
  content_type = "text/css"
}

resource "aws_s3_object" "js" {
  for_each = fileset("./resources/js/", "**/*.js")

  bucket       = aws_s3_bucket.this.id
  key          = each.value
  source       = "./resources/js/${each.value}"
  etag         = filemd5("./resources/js/${each.value}")
  content_type = "application/javascript"
}
