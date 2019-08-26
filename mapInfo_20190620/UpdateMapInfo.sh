#!/bin/bash 

aws dynamodb update-item --table-name hpc-locations-dev --key file://key.jsonc --update-expression "SET #C = :c, #M = :m, #R = :r " --expression-attribute-names file://Attributes.jsonc --expression-attribute-values file://Values.jsonc --return-values UPDATED_NEW

aws dynamodb update-item --table-name hpc-locations-prod --key file://key.jsonc --update-expression "SET #C = :c, #M = :m, #R = :r " --expression-attribute-names file://Attributes.jsonc --expression-attribute-values file://Values.jsonc --return-values UPDATED_NEW