/**
 * @template T
 * @param {T} e 
 * @returns {T}
 */
export function deepCopy(e) {
	return JSON.parse(JSON.stringify(e));
}

/**
 * 
 * @param {string} startXY 
 * @param {string} endXY 
 * @param {Map<string, string[]>} graph 
 * @returns {false|number[]}
 */
export function bfs(startNode, endNode, graph) {
	const queue = [startNode];
	const came_from = new Map();
	came_from.set(startNode, null);

	while (queue.length > 0) {
		const currentNode = queue.shift();
		if (currentNode == endNode) break;

		// Search side paths
		graph.get(currentNode).forEach(e => {
			if (!came_from.has(e)) {
				queue.push(e);
				came_from.set(e, currentNode);
			}
		});
	}

	let currentNode = endNode;
	const path = [];
	while (currentNode != startNode) {
		path.push(currentNode);
		currentNode = came_from.get(currentNode);
		if (!currentNode) return false;
	}
	return path;

}
