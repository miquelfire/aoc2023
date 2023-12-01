/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n')
		.map(e => e.replace(/\D/g, ''))
		.map(e => parseInt(e.charAt(0) + e.slice(-1), 10))
		.reduce((p, v) => p + v, 0);
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n')
		.map(e => e.replaceAll('one', 'o1e'))
		.map(e => e.replaceAll('two', 't2o'))
		.map(e => e.replaceAll('three', 't3'))
		.map(e => e.replaceAll('four', '4'))
		.map(e => e.replaceAll('five', '5'))
		.map(e => e.replaceAll('six', '6'))
		.map(e => e.replaceAll('seven', '7'))
		.map(e => e.replaceAll('eight', 'e8t'))
		.map(e => e.replaceAll('nine', '9e'))
		.map(e => e.replace(/\D/g, ''))
		.map(e => parseInt(e.charAt(0) + e.slice(-1), 10))
		.reduce((p, v) => p + v, 0);
	return data;
};
