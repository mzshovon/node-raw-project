/**
 * Title: Not found handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 * 
 */

const handler = {};


handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: 'Requested URL is not found'
    });
};

module.exports = handler;