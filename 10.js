/**
 * @param {string} d 
 */
export const part1 = async data => {
	const currentPos = [[-1, -1], [-1, -1]];
	const maxSize = [0, 0];
	const grid = new Map([['axa', { score: 0, nodes: ['bxb'] }]]);
	grid.clear();
	const visited = new Set(['']);
	visited.clear();

	data.split('\n')
		.forEach((e, y) => {
			maxSize[0] = Math.max(maxSize[0], y + 1);
			const row = e.split('');
			row.forEach((e, x) => {
				maxSize[1] = Math.max(maxSize[1], x + 1);
				const cell = y + 'x' + x;
				switch (e) {
					case '|':
						grid.set(cell, { score: 0, nodes: [(y - 1) + 'x' + (x), (y + 1) + 'x' + (x)] });
						break;
					case '-':
						grid.set(cell, { score: 0, nodes: [(y) + 'x' + (x - 1), (y) + 'x' + (x + 1)] });
						break;
					case 'L':
						grid.set(cell, { score: 0, nodes: [(y - 1) + 'x' + (x), (y) + 'x' + (x + 1)] });
						break;
					case 'J':
						grid.set(cell, { score: 0, nodes: [(y - 1) + 'x' + (x), (y) + 'x' + (x - 1)] });
						break;
					case '7':
						grid.set(cell, { score: 0, nodes: [(y + 1) + 'x' + (x), (y) + 'x' + (x - 1)] });
						break;
					case 'F':
						grid.set(cell, { score: 0, nodes: [(y + 1) + 'x' + (x), (y) + 'x' + (x + 1)] });
						break;
					case 'S':
						grid.set(cell, { score: 0, nodes: [] });
						currentPos[0][0] = y;
						currentPos[1][0] = y;
						currentPos[0][1] = x;
						currentPos[1][1] = x;
						break;
					default:
						grid.set(cell, { score: -1, nodes: [] });
						break;
				}
			});
		});
	// Find the nodes that connect to the start node
	for (let y = currentPos[0][0] - 1; y < currentPos[0][0] + 2; y++) {
		for (let x = currentPos[0][1] - 1; x < currentPos[0][1] + 2; x++) {
			if (y == currentPos[0][0] && x == currentPos[0][1]) continue;

			const pos = y + 'x' + x;
			const posCur = currentPos[0][0] + 'x' + currentPos[0][1];
			const node = grid.get(pos);
			if (node && node.nodes.includes(posCur)) {
				grid.get(posCur).nodes.push(pos);
			}
		}
	}

	/** @type {{score: number, nodes: string[]}[]} */
	const queue = [grid.get(currentPos[0][0] + 'x' + currentPos[0][1])];
	visited.add(currentPos[0][0] + 'x' + currentPos[0][1]);
	let score = 0;

	while (queue.length > 0) {
		score++;
		const path1 = queue.shift();
		const path2 = queue.shift();
		path1.score = score;
		path1.nodes.forEach(e => {
			if (!visited.has(e)) {
				visited.add(e);
				queue.push(grid.get(e));
			}
		});
		if (path2) {
			path2.score = score;
			path2.nodes.forEach(e => {
				if (!visited.has(e)) {
					visited.add(e);
					queue.push(grid.get(e));
				}
			});
		}

	}
	return score - 1;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	data.splice(0, data.length);
	return data;
};
