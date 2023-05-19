resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name

  tags = {
    Name : var.bucket_name
  }
}

resource "aws_s3_bucket_ownership_controls" "this" {
  bucket = aws_s3_bucket.this.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "this" {
  depends_on = [aws_s3_bucket_ownership_controls.this]

  bucket = aws_s3_bucket.this.id
  acl    = var.acl_type
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
      sse_algorithm = var.encription_algorithm
    }
  }
}

resource "aws_s3_object" "this" {
  count = length(var.objects)

  bucket       = aws_s3_bucket.this.id
  key          = var.objects[count.index].key
  source       = var.objects[count.index].source
  etag         = var.objects[count.index].etag
  content_type = var.objects[count.index].content_type
}

resource "aws_s3_bucket_logging" "this" {
  count = var.log_of == "" ? 0 : 1

  bucket = var.log_of

  target_bucket = aws_s3_bucket.this.id
  target_prefix = "log/"
}

# NOTE: The following is only created if a website configuration is provided

resource "aws_s3_bucket_website_configuration" "this" {
  count = length(keys(var.website_configuration)) > 0 ? 1 : 0

  bucket = aws_s3_bucket.this.id

  index_document {
    suffix = var.website_configuration.index_document
  }

  error_document {
    key = var.website_configuration.error_document
  }
}

data "aws_iam_policy_document" "allow_read_access" {
  statement {

    principals {
      type        = "AWS"
      identifiers = var.access_ids
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.this.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_policy" "read_access_policy" {
  count = length(keys(var.website_configuration)) > 0 ? 1 : 0

  bucket = aws_s3_bucket.this.id
  policy = data.aws_iam_policy_document.allow_read_access.json
}
