/**
 * Title: Routes
 * Description: Application Routings
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 */

// Dependencies
const {sampleHandler, sample} = require('./avengers/routeAvenegers/routeHandlers');

const routes = {
    'sample' : sampleHandler
};

module.exports = routes