#!/bin/bash
aws dynamodb update-item --table-name hpc-locations-prod --key file://key.jsonc --update-expression "SET #C = :c, #D = :d" --expression-attribute-names file://Attributes.jsonc --expression-attribute-values file://Values.jsonc --return-values UPDATED_NEW


aws dynamodb update-item --table-name hpc-locations-prod --key file://key.jsonc --update-expression "REMOVE Direction" --return-values ALL_NEW
    
# this file is used to delete the origin attibute 'Direction', and add two number attributes DirectionX and DirectionY 