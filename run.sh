#!/bin/sh

# Run locally

docker run --rm --name cors-image-proxy -p 3000:3000 -p 3002:3002 951525211323.dkr.ecr.eu-west-1.amazonaws.com/cors-image-proxy:0.1

# Then
# curl -v http://localhost:3000/dev/?url=https://nodejs.org/static/images/logo.svg
