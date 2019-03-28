const readENV = require("./readENV");

let server = "share1.dexcom.com";
const bridge = readENV('BRIDGE_SERVER')

if (bridge && bridge.indexOf(".") > 1) {
	server = bridge;
} 
else if (bridge && bridge === 'EU') {
	server = "shareous1.dexcom.com";
}

var config = {
	applicationId: "d89443d2-327c-4a6f-89e5-496bbb0317db",
	agent: "Dexcom Share/3.0.2.11 CFNetwork/711.2.23 Darwin/14.0.0",
	login: 'https://' + server + '/ShareWebServices/Services/General/LoginPublisherAccountByName',
	'accept': 'application/json',
	'content-type': 'application/json',
	LatestGlucose: 'https://' + server + '/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues',
	nightscout_upload: '/api/v1/entries.json',
	nightscout_battery: '/api/v1/devicestatus.json',
	MIN_PASSPHRASE_LENGTH: 12
};

module.exports = config;
