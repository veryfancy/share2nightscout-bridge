const directions = {
	NONE: 0,
	DoubleUp: 1,
	SingleUp: 2,
	FortyFiveUp: 3,
	Flat: 4,
	FortyFiveDown: 5,
	SingleDown: 6,
	DoubleDown: 7,
	'NOT COMPUTABLE': 8,
	'RATE OUT OF RANGE': 9
};

const trends = (() => {
	const keys = Object.keys(directions);
	const trends = keys.sort((a, b) => {
		return directions[a] - directions[b];
	});
	return trends;
})();

const trendToDirection = trend => {
	return trends[trend] || trends[0];
};

module.exports = (d) => {
	const wall = parseInt(d.WT.match(/\((.*)\)/)[1]);
	return {
		sgv: d.Value,
		date: wall,
		dateString: new Date(wall).toISOString(),
		trend: d.Trend,
		direction: trendToDirection(d.Trend),
		device: 'share2',
		type: 'sgv'
	};
}
