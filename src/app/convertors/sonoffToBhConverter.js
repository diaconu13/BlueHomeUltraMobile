/**
const device = require('../model/device/schema');
const uiDeviceTypeEnum = require("./deviceTypesEnum");
const signalTypeEnum = require("./signalTypeEnum");
const deviceDontroller = require('../model/device/controller');
*/

/**
 * this converts the sonoff specific objects to blue home domain specific models
 */
class SonOffToBHConverter {

    /**
     * from tele/dev_171/INFO1 get ip and 
     */
    convertDevice() {

    }
    
    convertSignal() {

    }

    /**
     * Create a initial empty device just with ip
     * @param {string} ip 
    
    createDeviceFromIP(ip) {
        const model = {
            name: ip,
            ip: ip,
            mac: 'undefined',
            uiDeviceType: uiDeviceTypeEnum.Relay,
            signals: [{
                signalName: "POWER",
                value: 0,
                unit: '',
                signalType: signalTypeEnum.Boolean,
                changedById: "admin"
            }]
        }
        deviceDontroller.createDummy(model);
    } */

}
module.exports = SonOffToBHConverter;