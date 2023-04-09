/**
 * Title: Token handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 09-04-2023
 * 
 */

const handler = {};
const data = require('../../ultrons/data');
const {parseJSON, hash, gererateRandomString} = require('../../asgards/utilities');


handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethodsList = ["post", "get", "put", "patch", "delete"];
    if(acceptedMethodsList.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._token = {};

handler._token.get = (requestProperties, callback) => {

};

handler._token.post = (requestProperties, callback) => {

    const mobileNumber = typeof(requestProperties.body.mobileNumber) === 'string' && requestProperties.body.mobileNumber.trim().length === 11 ? 
    requestProperties.body.mobileNumber : false;

    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 7 ? 
        requestProperties.body.password : false;
    
    if(mobileNumber && password) {
        const hashedPassword = hash(password);
        data.read('users', mobileNumber, (err1, userInfo) => {
            const userData = {... parseJSON(userInfo)};
            if(!err1 && hashedPassword == userData.password) {
                const tokenId = gererateRandomString(20);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    mobileNumber,
                    id: tokenId,
                    expires
                }
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if(!err2) {
                        callback(200, {
                            data: tokenObject
                        });
                    } else {
                        callback(500, {
                            error: "Something went wrong to write file"
                        });
                    }
                })
            } else {
                callback(400, {
                    error: "Wrong password!"
                });
            }
        })
    } else {

    }
};

handler._token.put = (requestProperties, callback) => {

};

handler._token.delete = (requestProperties, callback) => {

};

module.exports = handler;