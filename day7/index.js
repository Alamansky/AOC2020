const readFile = require("../readFile");
const buildNestedObj = require("./buildNestedObj");
const reduceNestedObj = require("./reduceNestedObj");

const countBagColors = (arr, currentBags, accum) => {
	let matchingRules = [];
	while (currentBags.length) {
		let currentBag = currentBags.shift();
		matchingRules.push(
			...arr.filter((rule) =>
				rule.split("contain")[1].includes(currentBag)
			)
		);
	}
	let nextBags = matchingRules.map((rule) => rule.split("bags contain")[0]);

	nextBags.forEach((bagColor) => {
		accum.add(bagColor);
	});
	return nextBags.length ? countBagColors(arr, nextBags, accum) : accum.size;
};

const alpha = (data, currentBags) => {
	let arr = data.split("\n");
	let numOfBags = countBagColors(arr, currentBags, new Set());
	console.log(`Number of valid bag colors is ${numOfBags}`);
};

const beta = (data, currentBag) => {
	let arr = data.split("\n");
	let bagObj = buildNestedObj({ arr, currentBag, obj: {} });
	let answer = reduceNestedObj({ obj: bagObj, subTotal: [], total: [] });
	console.log(`Number of bags nested inside 1 shiny gold bag is ${answer}`);
};

readFile({
	file: "day7/data.txt",
	cb: eval(process.argv[2]) || alpha,
	params: process.argv[2] == "beta" ? ["1", "shiny gold"] : ["shiny gold"],
});
