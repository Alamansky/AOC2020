const buildNestedObj = ({ arr, currentBag, obj }) => {
	let rule = arr.filter((rule) =>
		rule.split("contain")[0].includes(currentBag[1])
	);

	let nextBags = rule[0].includes("no")
		? []
		: rule[0]
				.split("contain")[1]
				.split(",")
				.map((x) => x.split(" ").filter((_, i) => i % 4 != 0))
				.map(([x, y, z] = x) => [x, `${y} ${z}`]);

	for (let i = 0; i < nextBags.length; ++i) {
		obj[`${nextBags[i][0]} ${nextBags[i][1]}`] = buildNestedObj({
			arr,
			currentBag: nextBags[i],
			obj: {},
		});
	}

	return obj;
};

module.exports = buildNestedObj;
