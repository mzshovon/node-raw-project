/**
 * Title: Sample handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 * 
 */

const handler = {};


handler.sampleHandler = (requestProperties, callback) => {
    callback(200, {
        message: 'This is sample URL'
    });
};

module.exports = handler;