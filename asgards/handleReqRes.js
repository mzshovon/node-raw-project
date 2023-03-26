const url = require('url');
const { StringDecoder } = require('string_decoder');
const {notFoundHandler} = require('../avengers/routeAvenegers/notFoundHandler');
const routes = require('../routes');
const handler = {};

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

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) == 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    console.log(queryString, headersObject, method, parsedUrl);
    // Response handling
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end("Node js application is successfully terminated");
    });
};

module.exports = handler