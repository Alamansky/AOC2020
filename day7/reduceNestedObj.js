const reduceNestedObj = ({ obj, subTotal, total }) => {
	Object.keys(obj).forEach((key) => {
		let newSubTotal = subTotal.concat(key);
		total.push(
			newSubTotal
				.map((x) => x.split(" ")[0])
				.reduce((accum, val) => (accum *= val), 1)
		);
		if (Object.values(obj[key]) != 0) {
			reduceNestedObj({
				obj: obj[key],
				subTotal: newSubTotal,
				total,
			});
		}
	});
	return total.reduce((accum, val) => (accum += val), 0);
};

module.exports = reduceNestedObj;
