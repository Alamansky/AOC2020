const readFile = require("../readFile");

const halveArray = (pass, arr) => {
	if (!pass.length) {
		return arr;
	} else {
		return ["F", "L"].includes(pass[0])
			? halveArray(pass.substr(1), arr.splice(0, arr.length / 2))
			: halveArray(pass.substr(1), arr.splice(-arr.length / 2));
	}
};

const seqArr = (n) =>
	Array(n)
		.fill(null)
		.map((_, i) => i);

const alpha = (data, planeDimensions) => {
	let arr = data.split("\n");
	let [numOfRows, numOfCols] = planeDimensions;
	let highestID = 0;
	let seatIDs = new Set(
		arr.map((pass) => {
			const rowCode = pass.slice(0, 7);
			const colCode = pass.slice(-3);
			let rowPos = halveArray(rowCode, seqArr(numOfRows));
			let colPos = halveArray(colCode, seqArr(numOfCols));

			let ID = rowPos[0] * 8 + colPos[0];
			if (ID > highestID) {
				highestID = ID;
			}
			return ID;
		})
	);
	for (let i = 0; i <= highestID; ++i) {
		if (!seatIDs.has(i) && seatIDs.has(i - 1) && seatIDs.has(i + 1)) {
			console.log(`Highest ID is ${highestID}, Missing ID is ${i}`);
			break;
		}
	}
};

//function alpha provides both solutions

readFile({
	file: "day5/data.txt",
	cb: alpha,
	params: [128, 8],
});
