const readFile = require("../readFile");

const alpha = (data, target) => {
	const dataSet = new Set(data.split("\n").map((x) => Number(x)));
	for (const num of dataSet) {
		let pair = Math.abs(target - num);
		if (dataSet.has(pair)) {
			let product = pair * num;
			console.log(
				`Numbers ${num} and ${pair} sum to ${target}, product is ${product}`
			);
			break;
		}
	}
};

const beta = (data, target) => {
	let dataSet = new Set(data.split("\n").map((x) => Number(x)));

	outerLoop: for (const firstNum of dataSet) {
		for (const secondNum of dataSet) {
			let sum = firstNum + secondNum;
			if (sum < target) {
				let thirdNum = target - sum;
				if (dataSet.has(thirdNum)) {
					let product = firstNum * secondNum * thirdNum;
					console.log(
						`Numbers ${firstNum}, ${secondNum}, and ${thirdNum} sum to ${target}, product is ${product}`
					);
					break outerLoop;
				}
			}
		}
	}
};

readFile({
	file: "day1/data.txt",
	cb: eval(process.argv[2]) || alpha,
	params: 2020,
});
