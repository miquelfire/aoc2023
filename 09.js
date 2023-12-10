function calculateDifferences(line) {
	return line.slice(1).map((value, index) => value - line[index]);
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(' ').map(e => BigInt(e)));
	let sum = 0n;

	data.forEach(records => {
		const diffCalc = [records];
		while (records.some(e => e != 0n)) {
			records = calculateDifferences(records);
			diffCalc.push(records);
		}
		sum += diffCalc.map(arr => arr[arr.length - 1]).reduce((a, b) => a + b);
	});

	return sum.toString(10);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(' ').map(e => BigInt(e)));
	let sum = 0n;

	data.forEach(records => {
		const diffCalc = [records];
		while (records.some(e => e != 0n)) {
			records = calculateDifferences(records);
			diffCalc.push(records);
		}
		sum += diffCalc.map(arr => arr[0]).reduceRight((a, b) => b - a);
	});

	return sum.toString(10);
};
