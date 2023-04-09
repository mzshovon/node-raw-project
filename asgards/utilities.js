/**
 * Title: Utilities
 * Description: Necessary utlility functions
 * Author: Md. Moniruzzaman
 * Date: 06-04-2023
 * 
 */

const crypto = require('crypto');
const environments = require('../asgards/environments');
const utilities = {};

utilities.parseJSON = (jsonString) => {
    let output = {};

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
}

// HAshing
utilities.hash = (str) => {
    if(typeof str === 'string' && str.length > 7) {
        const hash = crypto
                    .createHmac('sha512',  environments.secretKey)
                    .update(str)
                    .digest('hex');
        return hash;
    } else {
        return false;
    }
}

module.exports = utilities;