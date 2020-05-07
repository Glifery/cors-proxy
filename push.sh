#!/bin/sh

# eval "$(aws ecr get-login --region=eu-west-1 | sed -e 's/-e none//g')"
# or 
# aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 951525211323.dkr.ecr.eu-west-1.amazonaws.com

docker push 951525211323.dkr.ecr.eu-west-1.amazonaws.com/cors-image-proxy:0.1
