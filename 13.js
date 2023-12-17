/**
 * @param {string} d 
 */
export const part1 = async d => {
	let sum = 0;
	const data = d.split('\n\n').map(e => e.split('\n'));
	const dataTransposed = data
		.map(e => e.map(e => e.split(''))) // Makes the lines arrays
		.map(a => Object.keys(a[0]).map(c => a.map(r => r[c]))) // Transpose the array
		.map(e => e.map(e => e.join(''))); // Makes the lines strings

	data.forEach(e => {
		for (let i = 0; i < e.length - 1; i++) {
			if (e[i] == e[i + 1]) {
				let count = i;
				for (let j = i - 1, k = i + 2; j > -1 && k < e.length; j--, k++) {
					if (e[j] != e[k]) {
						count = -1;
						break;
					}
				}
				if (count > -1) {
					sum += ((count + 1) * 100);
				}
			}
		}
	});
	dataTransposed.forEach(e => {
		for (let i = 0; i < e.length - 1; i++) {
			if (e[i] == e[i + 1]) {
				let count = i;
				for (let j = i - 1, k = i + 2; j > -1 && k < e.length; j--, k++) {
					if (e[j] != e[k]) {
						count = -1;
						break;
					}
				}
				if (count > -1) {
					sum += (count + 1);
				}
			}
		}
	});
	return sum;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
