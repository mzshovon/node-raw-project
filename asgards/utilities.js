/**
 * Title: Utilities
 * Description: Necessary utlility functions
 * Author: Md. Moniruzzaman
 * Date: 06-04-2023
 * 
 */

const utilities = {};

utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
}

module.exports = utilities;