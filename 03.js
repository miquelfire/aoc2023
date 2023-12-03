/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n');
	const partNumberSearch = /\d+/g;
	const partSearch = /[^\d.]/;
	let sum = 0;

	data.forEach((rowData, row) => {
		const partLabels = [...rowData.matchAll(partNumberSearch)]
			.map(e => {
				return {
					colStart: Math.max(0, e.index - 1),
					colEnd: Math.min(rowData.length - 1, e.index + e[0].length),
					partNumber: parseInt(e[0], 10)
				};
			});

		partLabels.forEach((partLabel) => {
			let foundPart = false;
			for (let y = Math.max(0, row - 1); y <= Math.min(data.length - 1, row + 1); y++) {
				for (let x = partLabel.colStart; x <= partLabel.colEnd; x++) {
					if (partSearch.test(data[y][x])) {
						foundPart = true;
					}
				}
			}
			if (foundPart) {
				sum += partLabel.partNumber;
			}
		});
	});
	return sum;
	// Too High 541315
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	const gearSearch = /\*/g;
	const numberSearch = /\d/;
	const partNumberSearch = /\d+/g;
	let sum = 0;

	data.forEach((rowData, row) => {
		const gears = [...rowData.matchAll(gearSearch)]
			.map(e => {
				return {
					colStart: Math.max(0, e.index - 1),
					colEnd: Math.min(rowData.length - 1, e.index + e[0].length),
				};
			});

		gears.forEach(gear => {
			const partNumbersFound = [];
			for (let y = Math.max(0, row - 1); y <= Math.min(data.length - 1, row + 1); y++) {
				const partNumbers = [...data[y].matchAll(partNumberSearch)];
				partNumbers.forEach(e => {
					if (e.index <= gear.colEnd && (e.index + e[0].length - 1) >= gear.colStart) {
						partNumbersFound.push(parseInt(e[0], 10));
					}
				});
			}
			if (partNumbersFound.length == 2) {
				sum += partNumbersFound.reduce((p, v) => p * v, 1);
			}
			if (partNumbersFound.length > 2) {
				console.log(partNumbersFound);
				console.log(gear);
				debugger;
			}
		});
	});

	return sum;
};
