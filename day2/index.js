const readFile = require("../readFile");

const alpha = (data) => {
	let arr = data.split("\n");
	let isValidCount = 0;
	arr.forEach((entry) => {
		let [params, char, password] = entry.split(" ");
		let [floor, ceiling] = params.split("-");
		let charToFind = char.substring(0, 1);
		let foundChars = password.match(new RegExp(charToFind, "g")) || [];
		if (foundChars.length >= floor && foundChars.length <= ceiling) {
			++isValidCount;
		}
	});
	console.log(`Number of valid passwords is ${isValidCount}`);
};

const beta = (data) => {
	let arr = data.split("\n");
	let isValidCount = 0;
	arr.forEach((entry) => {
		let [params, char, password] = entry.split(" ");
		let [pos1, pos2] = params.split("-");
		let charToFind = char.substring(0, 1);
		let isValidBool = [
			password.charAt(pos1 - 1) == charToFind,
			password.charAt(pos2 - 1) == charToFind,
		].filter(Boolean).length;
		if (isValidBool == 1) {
			++isValidCount;
		}
	});
	console.log(`Number of valid passwords is ${isValidCount}`);
};

readFile({
	file: "day2/data.txt",
	cb: eval(process.argv[2]) || alpha,
});
