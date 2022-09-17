# CORS proxy

Simple AWS Lambda based proxy server for making CORS requests from browser to any HTTP server.

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

#### 3. Use

Open your browser and use `endpoint` field from previous console response as base address. For example:

```
 https://somelambdauuid.lambda-url.us-east-1.on.aws/https://github.com/
```
