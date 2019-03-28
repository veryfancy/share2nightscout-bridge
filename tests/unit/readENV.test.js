const should = require("should");
const readENV = require("../../readENV.js");

let env;

beforeEach(() => {
	env = process.env;
	process.env = {};
});

afterEach(() => {
	process.env = env;
});

describe("readENV", () => {
	it("returns env var with CUSTOMCONNSTR_ prefix and casing as passed in, if it exists", () => {
		process.env.CUSTOMCONNSTR_MY_ENV_VAR = "foo";
		should(readENV("MY_ENV_VAR")).equal("foo");
	});

	it("returns env var with CUSTOMCONNSTR_ prefix and lowercased varname, if it exists", () => {
		process.env.CUSTOMCONNSTR_my_env_var = "bar";
		should(readENV("MY_ENV_VAR")).equal("bar");
	});

	it("returns env var with no prefix and casing as passed in, if it exists", () => {
		process.env.MY_ENV_VAR = "baz";
		should(readENV("MY_ENV_VAR")).equal("baz");
	});

	it("returns env var with no prefix and lowercased varname, if it exists", () => {
		process.env.my_env_var = "derp";
		should(readENV("MY_ENV_VAR")).equal("derp");
	});

	it("returns default value if none of the env var variants are found", () => {
		should(readENV("MY_ENV_VAR", "default_value")).equal("default_value");
	});
});
