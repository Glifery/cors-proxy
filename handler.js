"use strict";

import fetch from "node-fetch";

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
export const corsProxy = async (event) => {
  return new Promise(async (resolve, reject) => {
    const {
      body,
      headers: h,
      queryStringParameters,
      pathParameters: { default: url },
      requestContext: {
        http: { method },
      },
    } = event;

    let { Host, host, Origin, origin, ...headers } = h;

    console.log({
      url,
      queryStringParameters,
    });

    //console.log(event);

    if (!url) {
      const errorResponse = {
        statusCode: 400,
        body: "Unable get url from 'url' query parameter",
      };
      reject(Error(errorResponse));
      return;
    }

    const entries = Object.entries(queryStringParameters || {});
    const q =
      (entries.length &&
        entries
          .reduce((acc, param) => {
            acc.push(param.join("="));
            return acc;
          }, [])
          .join("&")) ||
      null;

    const URL = `${url}${(q && "?" + q) || ""}`;
    const hasBody = /(POST|PUT)/i.test(method);
    try {
      const res = await fetch(URL, {
        method,
        timeout: 20000,
        body: hasBody ? body : null,
        headers,
      });
      console.log(`Got response from ${URL} ---> {statusCode: ${res.status}}`);

      let proxyResponse = {
        statusCode: res.status,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
          "content-type": res.headers["content-type"],
        },
      };

      const text = await res.text();
      proxyResponse.body = text;
      resolve(proxyResponse);
    } catch (err) {
      console.error(`Caught error: `, err);

      reject(err);
      return;
    }
  });
};
