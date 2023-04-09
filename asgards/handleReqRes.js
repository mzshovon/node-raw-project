const url = require('url');
const { StringDecoder } = require('string_decoder');
const {notFoundHandler} = require('../avengers/routeAvenegers/notFoundHandler');
const routes = require('../routes');
const handler = {};
const {parseJSON} = require('../asgards/utilities');
const { parse } = require('path');

handler.handleReqRes = (req, res) => {
    // Request handling from server
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryString,
        headersObject
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimmedPath] ?? notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    // Response handling
    req.on('end', () => {
        realData += decoder.end();
        requestProperties.body = parseJSON(realData);
        // Choose which response done from route
        chosenHandler(requestProperties, (statusCode, payload) => {
            
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
            payload = typeof(payload) == 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);
            //return response
            res.setHeader("Content-Type", "Application/Json");
            res.writeHead(statusCode);
            res.end(payloadString);
        });

        realData += decoder.end();
        console.log(realData);
    });
};

module.exports = handler