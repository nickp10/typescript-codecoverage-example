/// <reference path="../typings/index.d.ts" />

import * as assert from "assert";
import Person from "../src/person";

describe("Person", () => {
	describe("#getFullName()", () => {
		it("should concatenate the first and last names together", () => {
			const p = new Person();
			p.firstName = "John";
			p.lastName = "Smith";
			assert.equal(p.getFullName(), "John Smith");
		});
	});
});
