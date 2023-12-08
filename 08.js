/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const directions = data[0].split('');
	const nodes = new Map();
	let currentNode = 'AAA';
	let steps = 0;
	
	data[1].split('\n').map(e => {
		const parts = e.match(/([a-zA-Z]+) = \(([a-zA-Z]+), ([a-zA-Z]+)\)/);
		if (parts) {
			nodes.set(parts[1], [parts[2], parts[3]]);
		}
	});
	while (currentNode !== 'ZZZ') {
		const dir = nodes.get(currentNode);
		const dirPos = steps % directions.length;
		switch (directions[dirPos]) {
			case 'L':
				currentNode = dir[0];
				break;
			case 'R':
				currentNode = dir[1];
				break;
		}
		steps++;
	}
	return steps;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n');
	data.splice(0, data.length);
	return data;
};
