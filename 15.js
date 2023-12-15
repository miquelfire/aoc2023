/**
 * @param {string} str 
 */
function computeHash(str) {
	let currentValue = 0;
	str.split('').forEach(char => {
		currentValue += char.charCodeAt(0);
		currentValue *= 17;
		currentValue %= 256;
	});
	return currentValue;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split(',').map(e => computeHash(e));
	return data.reduce((p, v) => p + v);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
