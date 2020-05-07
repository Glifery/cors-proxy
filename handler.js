'use strict';

const request = require('request');

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
module.exports.corsProxy = (event, context, callback) => {
    const params = event.queryStringParameters;

    if (!params.url) {
        const errorResponse = {
            statusCode: 400,
            body: "Unable get url from 'url' query parameter"
        };

        callback(null, errorResponse);

        return;
    }

    return new Promise((resolve, reject) => {
        request(
          {
              url: params.url,
              method: event.httpMethod,
              timeout: 20000,
              encoding: null,
              Accept: 'image/*'
          },
          (err, originalResponse) => {
              if (err) {
                  callback(err);

                  reject(err);

                  return;
              }

              const proxyBody = originalResponse.body.toString('base64');

              const proxyResponse = {
                  statusCode: originalResponse.statusCode,
                  headers: {
                      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
                      'content-type': originalResponse.headers['content-type']
                  },
                  isBase64Encoded: true,
                  body: proxyBody
              };

              resolve(proxyResponse);
          }
        );
    });
};