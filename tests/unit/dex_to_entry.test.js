const should = require("should");
const dex_to_entry = require("../../dex_to_entry.js");

describe("dex_to_entry", () => {
	it("maps a dex value to a ns entry", () => {
		const dexValue = {
			DT: '/Date(1426292016000-0700)/', // display time
			ST: '/Date(1426295616000)/', // system time
			Trend: 4,
			Value: 101,
			WT: '/Date(1426292039000)/'
		};

		const entry = dex_to_entry(dexValue);

		entry.should.eql({
			sgv: 101,
			date: 1426292039000,
			dateString: '2015-03-14T00:13:59.000Z',
			trend: 4,
			direction: 'Flat',
			device: 'share2',
			type: 'sgv'
		});
	});
});