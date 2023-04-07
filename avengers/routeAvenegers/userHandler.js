/**
 * Title: User handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 04-04-2023
 * 
 */

const handler = {};
const data = require('../../ultrons/data');


handler.userHandler = (requestProperties, callback) => {
    const acceptedMethodsList = ["post", "get", "put", "patch", "delete"];
    if(acceptedMethodsList.indexOf(requestProperties.method) > -1) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._users = {};

handler._users.get = (requestProperties, callback) => {
    callback(200);
};

handler._users.post = (requestProperties, callback) => {
    const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? 
                        requestProperties.body.firstName : false;

    const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? 
                        requestProperties.body.lastName : false;

    const mobileNumber = typeof(requestProperties.body.mobileNumber) === 'string' && requestProperties.body.mobileNumber.trim().length === 11 ? 
                        requestProperties.body.mobileNumber : false;

    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 7 ? 
                        requestProperties.body.password : false;

    const termsAndAgreement = typeof(requestProperties.body.termsAndAgreement) === 'boolean' && requestProperties.body.termsAndAgreement.trim().length > 0 ? 
                        requestProperties.body.termsAndAgreement : false;

    if(firstName && lastName && mobileNumber && password && termsAndAgreement) {
        // User must not be existed
        data.read('users', mobileNumber, (err, user) => {
            if(err) {
                let userObject = {
                    firstName,
                    lastName,
                    mobileNumber,
                    password,
                    termsAndAgreement
                }
            } else {
                callback(500, {
                    error: "There is a problem in your server side"
                });
            }
        });

    } else {
        callback(400, {
            error: "You have a validation problem in your request",
        });
    }
    
};

handler._users.put = (requestProperties, callback) => {

};

handler._users.patch = (requestProperties, callback) => {

};

handler._users.delete = (requestProperties, callback) => {

};

module.exports = handler;