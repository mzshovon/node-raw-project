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
    const tokenId = typeof(requestProperties.queryString.tokenId) === 'string' && requestProperties.queryString.tokenId.trim().length > 0 ? 
    requestProperties.queryString.tokenId : false;

    if(tokenId) {
        data.read('tokens', tokenId, (err, tokenInfo) => {
            const tokenData = { ... parseJSON(tokenInfo) };
            if(!err && tokenData) {
                callback(200, tokenData);
            } else {
                callback(404, {
                    error: 'Token not found'
                })
            }
        })
    } else {
        callback(404, {
            error: 'Token not found'
        })
    }
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
                    error: "Wrong Token!"
                });
            }
        })
    } else {
        callback(400, {
            error: "Wrong Token!"
        });
    }
};

handler._token.put = (requestProperties, callback) => {
    const tokenId = typeof(requestProperties.body.tokenId) === 'string' && requestProperties.body.tokenId.trim().length > 0 ? 
        requestProperties.body.tokenId : false;
    const extend = typeof(requestProperties.body.extend) === 'boolean' && requestProperties.body.extend ?
        true : false;
    
    if(tokenId && extend) {
        data.read('tokens', tokenId, (err1, tokenData) => {
            const tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
                data.update('tokens', tokenId, tokenObject, (err2) => {
                    if(!err2) {
                        callback(200, {
                            message: "Token updated successfully"
                        });
                    } else {
                        callback(400, {
                            error: "Token can't be updated!"
                        });
                    }
                })
            } else {
                callback(400, {
                    error: "Token already expires!"
                });
            }
        })
    } else {
        callback(400, {
            error: "There is an error in your request!"
        });
    }
        
};

handler._token.delete = (requestProperties, callback) => {
    const tokenId = typeof(requestProperties.queryString.tokenId) === 'string' && requestProperties.queryString.tokenId.trim().length > 0 ? 
    requestProperties.queryString.tokenId : false;

    if(tokenId) {
        data.read('tokens', tokenId, (err, tokenData) => {
            if(!err && tokenData) {
                data.delete('tokens', tokenId, (err1) => {
                    if(!err1) {
                        callback(200, {
                            message: "Token deleted successfully"
                        })
                    } else {
                        callback(500, {
                            error: 'Not valid request/ No permission to unlink file'
                        })
                    }
                })
            } else {
                callback(404, {
                    error: 'Token not found'
                })
            }
        })
    } else {
        callback(404, {
            error: 'Token not found'
        })
    }
};

handler._token.verify = (mobileNumber, tokenId, callback) => {
    data.read('tokens', tokenId, (err, tokenObject) => {
        if(!err && tokenObject) {
            if(parseJSON(tokenObject).mobileNumber === mobileNumber && parseJSON(tokenObject).expires > Date.now()) {
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    })
}

module.exports = handler;