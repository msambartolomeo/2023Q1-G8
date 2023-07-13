#!/bin/bash

if [ $# -eq 1 ]
then
	var=$1
else
	var="terraform.tfvars"
fi

cd ./terraform/resources/lambda
rm -f *.zip

for f in *; do
    if [[ -f $f ]]; then
        filename=$(basename -s .py "$f")
        zip -rq "$filename.zip" $f
    fi
done

cd ../../organization

terraform apply --target=module.vpc --target=module.lambda --target=module.apigateway -var-file="${var}" -auto-approve

