/**
 * Title: User handler
 * Description: Sample Handler
 * Author: Md. Moniruzzaman
 * Date: 04-04-2023
 * 
 */

const handler = {};
const data = require('../../ultrons/data');
const {hash, parseJSON} = require('../../asgards/utilities');
const verifyToken = require('../../avengers/routeAvenegers/tokenHandler');


handler.userHandler = (requestProperties, callback) => {
    const acceptedMethodsList = ["post", "get", "put", "patch", "delete"];
    if(acceptedMethodsList.indexOf(requestProperties.method) > -1) {
        handler._checks[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
};

handler._checks = {};

handler._checks.get = (requestProperties, callback) => {
    const mobileNumber = typeof(requestProperties.queryString.mobileNumber) === 'string' && requestProperties.queryString.mobileNumber.trim().length === 11 ? 
    requestProperties.queryString.mobileNumber : false;
    if(mobileNumber) {
        const token = typeof requestProperties.headersObject.token === 'string' && requestProperties.headersObject.token.trim().length > 0 ?  requestProperties.headersObject.token : false;
        verifyToken._token.verify(mobileNumber, token, (tokenId) => {
            if(token && tokenId) {
                data.read('users', mobileNumber, (err, userInfo) => {
                    const user = { ... parseJSON(userInfo) };
                    if(!err && user) {
                        delete user.password;
                        callback(200, user);
                    } else {
                        callback(404, {
                            error: 'User not found'
                        })
                    }
                })
            } else {
                callback(403, {
                    error: 'User is not authenticated'
                });
            }
        })
    } else {
        callback(404, {
            error: 'User not found'
        })
    }
};

handler._checks.post = (requestProperties, callback) => {

    const protocol = typeof(requestProperties.body.protocol) === 'string' && ["http", "https"].indexOf(requestProperties.body.protocol) > -1 ? 
                        requestProperties.body.protocol : false;

    const methods = typeof(requestProperties.body.methods) === 'string' && ["get", "post", "put", "delete"].indexOf(requestProperties.body.methods) > -1 ? 
                        requestProperties.body.methods : false;

    const url = typeof(requestProperties.body.url) === 'string' && requestProperties.body.url.trim().length > 0 ? 
                        requestProperties.body.url : false;

    const timeout = typeof(requestProperties.body.timeout) === 'number' && requestProperties.body.timeout.trim().length >= 1 && requestProperties.body.timeout.trim().length <= 6 ? 
                        requestProperties.body.timeout : false;

    const successCodes = typeof(requestProperties.body.successCodes) === 'object' &&  requestProperties.body.successCodes instanceof Array ?  requestProperties.body.successCodes : false;

    if(protocol && methods && url && timeout && successCodes) {
        const tokenId = typeof requestProperties.headersObject.token === 'string' && requestProperties.headersObject.token.trim().length > 0 ? 
                        requestProperties.headersObject.token : false;
        if(tokenId) {
            data.read('tokens', tokenId, (err1, tokenObject) => {
                if(!err1) {
                    const mobileNumber = parseJSON(tokenObject).mobileNumber;
                    data.read('users', mobileNumber, (err2, userInfo) => {
                        if(!err2) {
                            verifyToken._token.verify(mobileNumber, tokenId, (tokenIsValid) => {
                                if(tokenIsValid) {
                                    const user = { ... parseJSON(userInfo) };
                                    
                                } else {
                                    callback(403, {
                                        error: 'Authentication failed'
                                    })
                                }
                            });
                        } else {
                            callback(403, {
                                error: 'Authentication failed'
                            })
                        }
                    })
                } else {
                    callback(400, {
                        error: 'User not found'
                    });
                }
            });

        } else {
            callback(403, {
                error: 'Authentication failed'
            });
        }
        // User must not be existed

    } else {
        callback(400, {
            error: "You have a validation problem in your request",
        });
    }
    
};

handler._checks.put = (requestProperties, callback) => {
    const firstName = typeof(requestProperties.body.firstName) === 'string' && requestProperties.body.firstName.trim().length > 0 ? 
    requestProperties.body.firstName : false;

    const lastName = typeof(requestProperties.body.lastName) === 'string' && requestProperties.body.lastName.trim().length > 0 ? 
        requestProperties.body.lastName : false;

    const password = typeof(requestProperties.body.password) === 'string' && requestProperties.body.password.trim().length > 7 ? 
        requestProperties.body.password : false;

    const mobileNumber = typeof(requestProperties.body.mobileNumber) === 'string' && requestProperties.body.mobileNumber.trim().length === 11 ? 
    requestProperties.body.mobileNumber : false;

    if(mobileNumber) {
        if(firstName || lastName || password) {
        const token = typeof requestProperties.headersObject.token === 'string' && requestProperties.headersObject.token.trim().length > 0 ?  requestProperties.headersObject.token : false;
        verifyToken._token.verify(mobileNumber, token, (tokenId) => {
            if(token && tokenId) {
                // User must not be existed
                data.read('users', mobileNumber, (err1, uData) => {
                    const userData = {... parseJSON(uData)};
                    if(!err1 && userData) {
                        if(firstName) {
                            userData.firstName = firstName;
                        }
                        if(lastName) {
                            userData.lastName = lastName;
                        }
                        if(password) {
                            userData.password = hash(password);
                        }
                        data.update('users', mobileNumber, userData, (err2) => {
                            if(!err2) {
                                callback(200, {
                                    message: "User updated successfully"
                                });
                            } else {
                                callback(500, {
                                    error: "Something went wrong"
                                });
                            }
                        })
                    } else {
                        callback(500, {
                        error: "There is a problem in your server side"
                    });
                }
            });
        } else {
            callback(403, {
                error: 'User is not authenticated'
            });
        }
        })

    } else {
        callback(400, {
        error: "You have a validation problem in your request",
    });
    }
    }
};

handler._checks.patch = (requestProperties, callback) => {

};

handler._checks.delete = (requestProperties, callback) => {
    const mobileNumber = typeof(requestProperties.queryString.mobileNumber) === 'string' && requestProperties.queryString.mobileNumber.trim().length === 11 ? 
    requestProperties.queryString.mobileNumber : false;

    if(mobileNumber) {
        data.read('users', mobileNumber, (err) => {
            if(!err) {
                data.delete('users', mobileNumber, (err1) => {
                    if(!err1) {
                        callback(200, {
                            message: "User deleted successfully"
                        })
                    } else {
                        callback(500, {
                            error: 'Not valid request/ No permission to unlink file'
                        })
                    }
                })
            } else {
                callback(404, {
                    error: 'User not found'
                })
            }
        })
    } else {
        callback(404, {
            error: 'User not found'
        })
    }
};

module.exports = handler;