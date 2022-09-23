# CORS proxy

Simple AWS Lambda URL based proxy for making CORS requests from browser to any HTTP server.

### Run on AWS

#### 0. Requirements

You need AWS account first.
Also you need your IAM user has access to deploy AWS lambdas.

As was done [here](./serverless.yml#L5) - provide your local AWS profile
with properly scoped permissions

And set the [region](./serverless.yml#L10)

```yml
provider:
    profile: <your_local_aws_profile>
    name: aws
    runtime: nodejs16.x
    timeout: 10 # max = 30
    stage: dev
    region: <your-region>
```

#### 1. Install

```
npm install
```

#### 2. Deploy

```
npm run deploy
```

#### 3. Use

Open your browser and use `endpoint` field from previous console response as base address. For example:

```
 https://xxxxxxxxx.lambda-url.us-east-1.on.aws/https://github.com/
```
