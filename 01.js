/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.replace(/\D/g, '')).map(e => parseInt(e.charAt(0) + e.slice(-1), 10))
		.reduce((p, v) => p + v, 0);
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return data;
};
