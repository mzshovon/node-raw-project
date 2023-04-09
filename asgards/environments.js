/**
 * Title: Environments
 * Description: Handle Environments Variable
 * Author: Md. Moniruzzaman
 * Date: 26-03-2023
 * 
 */

const environments = {};


environments.staging = {
    port : 3000,
    envName : 'staging',
    secretKey: 'gfgdfhfdhl423342'    
};

environments.production = {
    port : 3000,
    envName : 'production',
    secretKey: 'wdfwer23r42r34r434'    
};

environments.local = {
    port : 3030,
    envName : 'local',
    secretKey: '456436lg;sdfgd'      
};

// Detemine which value is assigned
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'local';

const environmentToExport = typeof environments[currentEnvironment] == 'object' ? 
                                                                    environments[currentEnvironment] :
                                                                    environments.staging;

module.exports = environmentToExport;