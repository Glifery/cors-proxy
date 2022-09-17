# CORS proxy

Simple AWS Lambda based proxy server for making CORS requests from browser to any HTTP server.

### Run locally

#### 1. Install

```
npm install
```

#### 2. Use

Open your browser and go to `http://localhost:3000/<origin page>`. For example:

```
http://localhost:3000/https://github.com/
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

#### 3. Use

Open your browser and use `endpoint` field from previous console response as base address. For example:

```
https://qwertyuiop.execute-api.eu-central-1.amazonaws.com/dev/https://github.com/
```
