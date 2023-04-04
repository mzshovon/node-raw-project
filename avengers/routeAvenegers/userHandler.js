/**
 * Title: User handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 04-04-2023
 * 
 */

const handler = {};


handler.userHandler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is sample URL'
    });
};

module.exports = handler;