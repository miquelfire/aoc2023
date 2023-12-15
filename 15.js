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
	const data = d.split(',').map(e => [e.split(/([-=])/), computeHash(e.split(/[-=]/)[0])]);
	/** @type {[string, string][][]} */
	const boxes = Array.from(new Array(256), () => []);
	data.forEach(e => {
		const [[label, operator, focal], box] = e;
		const idx = boxes[box].findIndex(e => e[0] == label);
		switch (operator) {
			case '-':
				if (idx != -1) {
					boxes[box].splice(idx, 1);
				}
				break;
			case '=':
				if (idx != -1) {
					boxes[box][idx][1] = focal;
				} else {
					boxes[box].push([label, focal]);
				}
				break;
		}
	});
	boxes.forEach((box, boxIdx) => {
		for (let idx = 0; idx < box.length; idx++) {
			boxes[boxIdx][idx] = (boxIdx + 1) * (idx + 1) * (box[idx][1]);
		}
		boxes[boxIdx] = box.reduce((p, v) => p + v, 0);
	});
	return boxes.reduce((p, v) => p + v);
};
