variable "domain_name" {
  type        = string
  description = "The domain name for the website."
}

variable bucket_name{
  type = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}

variable "bucket__prefix" {
  type        = string
  description = "The name of the bucket prefix."
  default = "cloud-website-prefix"
}

variable "CDN_OAI"{
  description = "OAI of authorized bucket accessors"
  type        = list(string)
}

/*variable "account_id"{
    type = string
    description = "The account ID from the learner lab found in the AWS details tab"
}*/