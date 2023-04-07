/**
 * Title: Landing file
 * Description: Application bootstraping and scaffolding
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 */

const http = require('http');
const { handleReqRes } = require('./asgards/handleReqRes');
const environment = require('./asgards/environments');
// const data = require('./ultrons/data');

const app = {};

// @TODO: After swipe

// data.create('test', 'newFile', {name : 'Bangladesh', programmingLanguage : 'GOLang'}, (err)=> {
//     console.log("error was "+ err);
// });

// data.read('test', 'newFile', (err, data)=> {
//     console.log(err, data);
// });

// data.update('test', 'newFile', {name : 'India', programmingLanguage : 'C#'}, (err)=> {
//     console.log("error was "+ err);
// });

// data.delete('test', 'newFile', (err)=> {
//     console.log("error was "+ err);
// });

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