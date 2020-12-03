const fs = require("fs");

module.exports = readFile = ({ file, cb, params = null }) => {
	fs.readFile(file, "utf-8", (err, data) => {
		if (err) {
			console.log("There was an error in reading the file.");
			console.error(err);
		} else {
			cb(data, params);
		}
	});
};
