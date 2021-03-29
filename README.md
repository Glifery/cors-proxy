# CORS proxy

Simple AWS Lambda based proxy server for making CORS requests from browser to any HTTP server.

### Run locally

#### 1. Install
```
npm install
```
#### 2. Run
```
node_modules/.bin/serverless offline
```
or
```
npm run offline
```
#### 3. Use
Open your browser and go to `http://localhost:3000/?url=<origin page>`. For example:
```
http://localhost:3000/?url=https://github.com/
```

### Run on AWS

#### 0. Requirements
You need AWS account first.
Also you need your IAM user has access to deploy AWS lambdas.
```
node_modules/.bin/serverless config credentials --provider aws --key <aws_key> --secret <aws_secret>
```

#### 1. Install
```
npm install
```
#### 2. Deploy
```
node_modules/.bin/serverless deploy --region <aws_region>
```
or 
```
npm run deploy
```
You will see such console response:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (16.08 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............................
Serverless: Stack update finished...
Service Information
service: cors-proxy
stage: dev
region: eu-central-1
stack: cors-proxy-dev
api keys:
  None
endpoints:
  GET - https://qwertyuiop.execute-api.eu-central-1.amazonaws.com/dev/
functions:
  lambda: cors-proxy-dev-lambda
```
#### 3. Use
Open your browser and use `endpoint` field from previous console response as base address. For example:
```
https://qwertyuiop.execute-api.eu-central-1.amazonaws.com/dev/?url=https://github.com/
```