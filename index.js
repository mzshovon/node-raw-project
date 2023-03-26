/**
 * Title: Landing file
 * Description: Application bootstraping and scaffolding
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 */

const http = require('http');
const { handleReqRes } = require('./asgards/handleReqRes');
const environment = require('./asgards/environments');

const app = {};

// App config
app.config = {
    port : 3030
};

// Configure a server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    });

}

// Handle incoming and outgoing request
app.handleReqRes = handleReqRes;

// Build server
app.createServer();