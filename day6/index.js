const readFile = require("../readFile");

const alpha = (data) => {
	let count = data
		.split("\n\n")
		.reduce(
			(accum, val) => (accum += new Set(val.split("\n").join("")).size),
			0
		);
	console.log(`Number of answered questions is ${count}.`);
};

const beta = (data) => {
	let count = data.split("\n\n").reduce((total, group) => {
		let answersPerGroup = {};
		let peoplePerGroup = 0;

		group.split("\n").forEach((person) => {
			person.split("").forEach((answer) => {
				if (answersPerGroup[answer]) {
					++answersPerGroup[answer];
				} else {
					answersPerGroup[answer] = 1;
				}
			});
			++peoplePerGroup;
		});
		return (total += Object.values(answersPerGroup).filter(
			(x) => x == peoplePerGroup
		).length);
	}, 0);
	console.log(
		`Number of questions answered by all people in group is ${count}.`
	);
};

readFile({
	file: "day6/data.txt",
	cb: eval(process.argv[2]) || alpha,
	params: [128, 8],
});
