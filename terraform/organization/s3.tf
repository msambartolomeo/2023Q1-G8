module "s3" {
  for_each = local.s3
  source   = "../modules/s3"

  access_ids            = [module.cloudfront.OAI]
  bucket_name           = each.value.bucket_name
  objects               = try(each.value.objects, [])
  website_configuration = try(each.value.website_configuration, {})
  encription_algorithm  = each.value.encription_algorithm
  acl_type              = each.value.acl_type
  log_of                = try(each.value.log_of, "")
}
