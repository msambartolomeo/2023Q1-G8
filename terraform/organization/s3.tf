module "s3" {
  for_each = local.s3
  source   = "../modules/s3"

  access_ids            = [module.cloudfront.OAI]
  bucket_name           = each.value.bucket_name
  objects               = each.value.objects
  website_configuration = try(each.value.website_configuration, {})
  encription_algorithm  = each.value.encription_algorithm
}
