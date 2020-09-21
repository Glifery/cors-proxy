"use strict";

const fetch = require("node-fetch");

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
module.exports.corsProxy = async (event) => {
  return new Promise((resolve, reject) => {
    let params = event.queryStringParameters;
    let { Host, host, Origin, origin, ...headers } = event.headers;
    let proxyResponse = {};

    console.log(event);
    console.log(`Got request with params:`, params);

    if (!params.url) {
      const errorResponse = {
        statusCode: 400,
        body: "Unable get url from 'url' query parameter",
      };
      reject(Error(errorResponse));
      return;
    }

    const requestParams = Object.entries(params)
      .reduce((acc, param) => {
        if (param[0] !== "url") acc.push(param.join("="));
        return acc;
      }, [])
      .join("&");

    const url = `${params.url}${requestParams}`;
    fetch(url, {
      method: event.httpMethod,
      timeout: 20000,
      body: event.httpMethod === "POST" ? event.body : null,
      headers,
    })
      .then((res) => {
        console.log(
          `Got response from ${url} ---> {statusCode: ${res.status}}`,
        );

        proxyResponse = {
          statusCode: res.status,
          headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
            "content-type": res.headers["content-type"],
          },
        };
        return res.text();
      })
      .then((body) => {
        proxyResponse.body = body;

        resolve(proxyResponse);
      })
      .catch((err) => {
        if (err) {
          console.error(`Got error`, err);

          reject(err);
          return;
        }
      });
  });
};
