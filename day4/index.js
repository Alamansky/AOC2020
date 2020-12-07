const readFile = require("../readFile");

const alpha = (data, fields) => {
	let validPassports = data.split("\n\n").filter(
		(passport) =>
			passport.split(/ |\n/).reduce((accum, val) => {
				fields.includes(val.split(":")[0]) && accum.add(val);
				return accum;
			}, new Set()).size == fields.length
	).length;
	console.log(`Number of valid passports is ${validPassports}`);
};

const beta = (data, fields) => {
	let passportDataIsValid = {
		byr: (val) => val >= 1920 && val <= 2002,
		iyr: (val) => val >= 2010 && val <= 2020,
		eyr: (val) => val >= 2010 && val <= 2030,
		hgt: (val) =>
			val.substr(-2) == "cm"
				? val.substr(0, 3) >= 150 && val.substr(0, 3) <= 193
				: val.substr(-2) == "in"
				? val.substr(0, 2) >= 59 && val.substr(0, 2) <= 76
				: false,
		hcl: (val) => val[0] == "#" && val.match(/[a-z]|[0-9]/g).length == 6,
		ecl: (val) =>
			["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val),
		pid: (val) => val.length == 9,
		cid: () => true,
	};

	let validPassports = data.split("\n\n").filter(
		(passport) =>
			passport.split(/ |\n/).reduce((accum, val) => {
				const [fieldKey, fieldValue] = val.split(":");
				fields.includes(fieldKey) &&
					passportDataIsValid[fieldKey](fieldValue) &&
					accum.add(fieldKey);
				return accum;
			}, new Set()).size == fields.length
	).length;
	console.log(
		`Number of valid passports when validating data is ${validPassports}`
	);
};

readFile({
	file: "day4/data.txt",
	cb: eval(process.argv[2]) || alpha,
	params: ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"],
});
