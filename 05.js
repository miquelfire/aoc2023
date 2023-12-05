
/**
 * @param {string} almanac 
 * @param {Array} seeds 
 */
function handleConversion(almanac, inputs) {
	const conversions = almanac.split('\n').map(e => e.split(' '));
	const convertType = conversions.shift()[0];
	conversions.forEach((e, i) => {
		// Change to BigInt
		conversions[i] = e.map(e => BigInt(e));
		// Convert the second number to the amount to change the input in the range of this line
		conversions[i][0] = conversions[i][0] - conversions[i][1];
		// Set the start and end for the range
		conversions[i][1] = [conversions[i][1], conversions[i][2] + conversions[i][1]];
		// Don't need the range amount now
		conversions[i].pop();
	});

	inputs.forEach((input, i) => {
		const convert = conversions.filter(e => input >= e[1][0] && input < e[1][1]);
		if (convert.length) {
			inputs[i] += convert[0][0];
		}
	});

	return convertType;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const seeds = data.shift().split(' ').slice(1).map(e => BigInt(e));

	data.forEach(e => handleConversion(e, seeds));

	return seeds.reduce((m, e) => e < m ? e : m); // Use this instead of Math.min because of BigInt types
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
