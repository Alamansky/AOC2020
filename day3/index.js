const readFile = require("../readFile");

const alpha = (data) => {
	const arr = data.split("\n");
	let xPos = 0;
	let total = 0;
	for (let i = 0; i < arr.length; i++) {
		if (xPos >= arr[i].length) {
			xPos = Math.abs(arr[i].length - xPos);
		}
		if (arr[i].charAt(xPos) == "#") {
			++total;
		}
		xPos = xPos + 3;
	}
	console.log(`Total is ${total}`);
};

const beta = (data, directions) => {
	let product = 0;
	directions.forEach(([right, down]) => {
		const arr = data.split("\n");
		let xPos = 0;
		let subTotal = 0;
		for (let i = 0; i < arr.length; i = i + down) {
			if (xPos >= arr[i].length) {
				xPos = Math.abs(arr[i].length - xPos);
			}
			if (arr[i].charAt(xPos) == "#") {
				++subTotal;
			}
			xPos = xPos + right;
		}
		product = product == 0 ? subTotal : product * subTotal;
	});
	console.log(`Product is ${product}`);
};

readFile({
	file: "day3/data.txt",
	cb: eval(process.argv[2]) || alpha,
	params: [
		[1, 1],
		[3, 1],
		[5, 1],
		[7, 1],
		[1, 2],
	],
});
