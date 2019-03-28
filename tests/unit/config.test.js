const proxyquire = require("proxyquire");
const sinon = require("sinon");

describe("config", () => {
	let readENV;

	beforeEach(() => {
		readENV = sinon.stub();
	});

	describe("with no bridge set", () => {
		let config;

		beforeEach(() => {
			config = proxyquire("../../config.js", {
				"./readENV": readENV
			});
		});

		it("should have expected accept", () => {
			config["accept"].should.equal("application/json");
		});

		it("should have expected agent", () => {
			config.agent.should.equal("Dexcom Share/3.0.2.11 CFNetwork/711.2.23 Darwin/14.0.0");
		});

		it("should have expected applicationId", () => {
			config.applicationId.should.equal("d89443d2-327c-4a6f-89e5-496bbb0317db");
		});

		it("should have expected content-type", () => {
			config["content-type"].should.equal("application/json");
		});

		it("should have expected LatestGlucose", () => {
			config.LatestGlucose.should.equal("https://share1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues");
		});

		it("should have expected login", () => {
			config.login.should.equal("https://share1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName");
		});

		it("should have expected nightscout_upload", () => {
			config.nightscout_upload.should.equal("/api/v1/entries.json");
		});

		it("should have expected nightscout_battery", () => {
			config.nightscout_battery.should.equal("/api/v1/devicestatus.json");
		});

		it("should have expected MIN_PASSPHRASE_LENGTH", () => {
			config.MIN_PASSPHRASE_LENGTH.should.equal(12);
		});
	});

	describe("with bridge set to \"EU\"", () => {
		let config;
		
		beforeEach(() => {
			readENV.withArgs("BRIDGE_SERVER").returns("EU")
			config = proxyquire("../../config.js", {
				"./readENV": readENV
			});
		});
		
		it("should have expected LatestGlucose", () => {
			config.LatestGlucose.should.equal("https://shareous1.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues");
		});

		it("should have expected login", () => {
			config.login.should.equal("https://shareous1.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName");
		});
	});

	describe("with bridge set to a domain", () => {
		let config;
		
		beforeEach(() => {
			readENV.withArgs("BRIDGE_SERVER").returns("foo.bar.net")
			config = proxyquire("../../config.js", {
				"./readENV": readENV
			});
		});
		
		it("should have expected LatestGlucose", () => {
			config.LatestGlucose.should.equal("https://foo.bar.net/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues");
		});

		it("should have expected login", () => {
			config.login.should.equal("https://foo.bar.net/ShareWebServices/Services/General/LoginPublisherAccountByName");
		});
	});
});