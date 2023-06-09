/**
 * Title: Routes
 * Description: Application Routings
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 */

// Dependencies
const {sampleHandler} = require('./avengers/routeAvenegers/routeHandlers');
const {userHandler} = require('./avengers/routeAvenegers/userHandler');
const {tokenHandler} = require('./avengers/routeAvenegers/tokenHandler');
const {checkHandler} = require('./avengers/routeAvenegers/checkHandler');

const routes = {
    'sample' : sampleHandler,
    'user' : userHandler,
    'token' : tokenHandler,
    'check' : checkHandler,
};

module.exports = routes