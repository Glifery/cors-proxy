'use strict'

import fetch from 'node-fetch'

export const corsProxy = async (event) => {
    return new Promise(async (resolve, reject) => {
        const {
            body,
            headers: h,
            // "rawPath": "/https://api.census.gov/data/2021/acs/acs1/cprofile"
            rawPath,
            // "rawQueryString": "get=NAME,CP02_2021_001E,CP02_2017_013E&for=state:*"
            rawQueryString,
            requestContext: {
                http: { method }
            }
        } = event

        //console.log(JSON.stringify(event, null, 2))
        let { Host, host, Origin, origin, ...headers } = h

        const path = rawPath.substr(1)
        const query = rawQueryString ? '?' + rawQueryString : ''
        const url = path + query

        if (!url) {
            const errorResponse = {
                statusCode: 400,
                body: "Unable get url from 'url' query parameter"
            }
            reject(Error(errorResponse))
            return
        }

        const hasBody = /(POST|PUT)/i.test(method)
        try {
            const res = await fetch(url, {
                method,
                timeout: 20000,
                body: hasBody ? body : null,
                headers
            })
            console.log(
                `Got response from ${url} ---> {statusCode: ${res.status}}`
            )

            let proxyResponse = {
                statusCode: res.status,
                headers: {
                    // @deprecated: function URL CORS support is enabled in serverless.yml
                    // Required for CORS support to work
                    //'Access-Control-Allow-Origin': '*',
                    // Required for cookies, authorization headers with HTTPS
                    //'Access-Control-Allow-Credentials': true,
                    'content-type': res.headers['content-type']
                }
            }

            const text = await res.text()
            proxyResponse.body = text
            resolve(proxyResponse)
        } catch (err) {
            console.error(`Caught error: `, err)

            reject(JSON.stringify(err, null, 2))
            return
        }
    })
}

//example function URL event:
//{
//    "version": "2.0",
//    "routeKey": "$default",
//    "rawPath": "/https://api.census.gov/data/2021/acs/acs1/cprofile",
//    "rawQueryString": "get=NAME,CP02_2021_001E,CP02_2017_013E&for=state:*",
//    "headers": {
//        "sec-fetch-mode": "cors",
//        "x-amzn-tls-version": "TLSv1.2",
//        "sec-fetch-site": "none",
//        "accept-language": "en-US,en;q=0.9,pt-PT;q=0.8,pt;q=0.7,fr;q=0.6,la;q=0.5",
//        "x-forwarded-proto": "https",
//        "postman-token": "76e9e064-df79-762d-233e-5f76e27f584f",
//        "x-forwarded-port": "443",
//        "x-forwarded-for": "108.45.130.51",
//        "accept": "*/*",
//        "x-amzn-tls-cipher-suite": "ECDHE-RSA-AES128-GCM-SHA256",
//        "sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
//        "sec-ch-ua-mobile": "?0",
//        "x-amzn-trace-id": "Root=1-63251f33-7b98f5a105cccae234c99190",
//        "sec-ch-ua-platform": "\"Windows\"",
//        "host": "xxxxxxxxx.lambda-url.us-east-1.on.aws",
//        "cache-control": "no-cache",
//        "accept-encoding": "gzip, deflate, br",
//        "sec-fetch-dest": "empty",
//        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
//    },
//    "queryStringParameters": {
//        "get": "NAME,CP02_2021_001E,CP02_2017_013E",
//        "for": "state:*"
//    },
//    "requestContext": {
//        "accountId": "anonymous",
//        "domainName": "xxxxxxxxx.lambda-url.us-east-1.on.aws",
//        "domainPrefix": "xxxxxxxxx",
//        "http": {
//            "method": "GET",
//            "path": "/https://api.census.gov/data/2021/acs/acs1/cprofile",
//            "protocol": "HTTP/1.1",
//            "sourceIp": "108.45.130.51",
//            "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
//        },
//        "requestId": "86a54954-b4c2-4de7-87ff-506c5d7b4a72",
//        "routeKey": "$default",
//        "stage": "$default",
//        "time": "17/Sep/2022:01:13:23 +0000",
//        "timeEpoch": 1663377203304
//    },
//    "isBase64Encoded": false
//}.
