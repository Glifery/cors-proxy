'use strict';

const axios = require('axios');

/**
 * Use this command to launch the handler from console:
 *
 * node_modules/.bin/serverless invoke local -f lambda -d '{"httpMethod":"GET","queryStringParameters":{"url":"http://github.com"}}'
 *
 *  or from browser
 *
 * http://localhost:3000/?url=https://github.com
 */
module.exports.corsProxy = event => {
    const params = event.queryStringParameters;

    if (!params.url) {
        const errorResponse = {
            statusCode: 400,
            body: "Unable get url from 'url' query parameter"
        };

        return Promise.resolve(errorResponse);
    }

    return axios({
        url: params.url,
        method: event.httpMethod,
        timeout: 20000,
	responseType: 'arraybuffer'
    }).then(response => ({
        statusCode: response.status,
        headers: {
            'Access-Control-Allow-Origin': '*', // Required for CORS support to work
            'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
            'content-type': response.headers['content-type']
        },
        body: response.data
    }));
};
