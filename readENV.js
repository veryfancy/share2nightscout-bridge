function readEnv(varName, defaultValue) {
	// Azure uses this prefix
	var value = process.env['CUSTOMCONNSTR_' + varName]
		|| process.env['CUSTOMCONNSTR_' + varName.toLowerCase()]
		|| process.env[varName]
		|| process.env[varName.toLowerCase()];

	return value || defaultValue;
}

module.exports = readEnv;
