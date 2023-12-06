/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(/ +/).slice(1).map(e => parseInt(e, 10)));
	const records = [{time: 0, dist: 0}];
	let winsTotal = 1;
	records.pop(); // Remove the demo record put to allow autocomplete to work
	data[0].forEach((e, i) => {
		records.push({time: e, dist: data[1][i]});
	});
	records.forEach(record => {
		let wins = 0;
		for (let i = 1; i < record.time; i++) {
			const dist = i * (record.time - i);
			if (dist > record.dist) {
				wins++;
			}
		}
		winsTotal *= wins;
	});
	return winsTotal;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
