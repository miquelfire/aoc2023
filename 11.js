/**
 * @param {string} d 
 */
export const part1 = async d => {
	const maxSize = [-1, -1];
	const occupiedSpace = [new Set([0]), new Set([0])];
	occupiedSpace[0].clear();
	occupiedSpace[1].clear();
	const emptySpace = [new Set([0]), new Set([0])];
	emptySpace[0].clear();
	emptySpace[1].clear();
	const galaxiesFound = new Set('');
	galaxiesFound.clear();
	/** @type {Map<string, string[]>} */
	const bfsMap = new Map();
	let sum = 0;

	const data = d.split('\n').map((e, y) => {
		maxSize[0] = y + 1;
		if (e.indexOf('#') > -1) {
			occupiedSpace[0].add(y);
		}
		return e.split('').map((e, x) => {
			maxSize[1] = x + 1;
			if (e == '#') {
				occupiedSpace[1].add(x);
			}
			return e;
		});
	});

	// Find the empty space
	for (let y = 0; y < maxSize[0]; y++) {
		if (!occupiedSpace[0].has(y)) {
			emptySpace[0].add(y);
		}
	}
	for (let x = 0; x < maxSize[1]; x++) {
		if (!occupiedSpace[1].has(x)) {
			emptySpace[1].add(x);
		}
	}

	// Process expansion
	const emptySpaceIndex = [Array.from(emptySpace[0]).reverse(), Array.from(emptySpace[1]).reverse()];
	for (const yidx of emptySpaceIndex[0]) {
		data.splice(yidx, 0, []);
		data[yidx + 1].forEach(e => data[yidx].push(e));
	}

	for (const xidx of emptySpaceIndex[1]) {
		for (let yidx = 0; yidx < data.length; yidx++) {
			data[yidx].splice(xidx, 0, '.');
		}
	}

	// Build the bfs grid
	for (let y = 0; y < data.length; y++) {
		for (let x = 0; x < data[y].length; x++) {
			if (data[y][x] == '#') {
				galaxiesFound.add(y + 'x' + x);
			}
			const connectors = [];
			if (y - 1 > -1) {
				connectors.push((y - 1) + 'x' + x);
			}
			if (x - 1 > -1) {
				connectors.push(y + 'x' + (x - 1));
			}
			if (y + 1 < data.length) {
				connectors.push((y + 1) + 'x' + x);
			}
			if (x + 1 < data[y].length) {
				connectors.push(y + 'x' + (x + 1));
			}
			bfsMap.set(y + 'x' + x, connectors);
		}
	}

	const g = [...galaxiesFound];
	for (let i = 0; i < g.length - 1; i++) {
		for (let j = i + 1; j < g.length; j++) {
			const g1 = g[i].split('x').map(e => parseInt(e, 10));
			const g2 = g[j].split('x').map(e => parseInt(e, 10));
			sum += Math.abs(g1[0] - g2[0]);
			sum += Math.abs(g1[1] - g2[1]);
		}
	}
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
