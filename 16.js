const Dir = Object.freeze({
	North: Symbol('north'),
	South: Symbol('south'),
	West: Symbol('west'),
	East: Symbol('east'),
});

class Beam {
	/**
	 * @param {number} y 
	 * @param {number} x 
	 * @param {Dir} dir 
	 */
	constructor(y, x, dir) {
		this.#x = x;
		this.#y = y;
		this.#dir = dir;
	}

	get yx() {
		return this.#y + 'x' + this.#x;
	}

	get yxd() {
		const ret = this.yx + 'x';
		switch (this.#dir) {
			case Dir.North:
				return ret + 'north';
			case Dir.South:
				return ret + 'south';
			case Dir.West:
				return ret + 'west';
			case Dir.East:
				return ret + 'east';
		}
		return this.yx + 'x' + this.#dir.toString();
	}

	/**
	 * @param {string[][]} data 
	 * @returns {Beam[]}
	 */
	moveBeam(data) {
		const ret = [];
		switch (this.#dir) {
			case Dir.North:
				if (this.#y > -1) { // While not needed, just in case
					switch (data[this.#y][this.#x]) {
						case '-':
							if (this.#x - 1 > -1) {
								ret.push(new Beam(this.#y, this.#x - 1, Dir.West));
							}
							if (this.#x + 1 < data[this.#y].length) {
								ret.push(new Beam(this.#y, this.#x + 1, Dir.East));
							}
							break;
						case '/':
							if (this.#x + 1 < data[this.#y].length) {
								ret.push(new Beam(this.#y, this.#x + 1, Dir.East));
							}
							break;
						case '\\':
							if (this.#x - 1 > -1) {
								ret.push(new Beam(this.#y, this.#x - 1, Dir.West));
							}
							break;
						default:
							if (this.#y - 1 > -1) {
								ret.push(new Beam(this.#y - 1, this.#x, this.#dir));
							}
					}
				}
				break;
			case Dir.South:
				if (this.#y < data.length) {
					switch (data[this.#y][this.#x]) {
						case '-':
							if (this.#x - 1 > -1) {
								ret.push(new Beam(this.#y, this.#x - 1, Dir.West));
							}
							if (this.#x + 1 < data[this.#y].length) {
								ret.push(new Beam(this.#y, this.#x + 1, Dir.East));
							}
							break;
						case '/':
							if (this.#x - 1 > -1) {
								ret.push(new Beam(this.#y, this.#x - 1, Dir.West));
							}
							break;
						case '\\':
							if (this.#x + 1 < data[this.#y].length) {
								ret.push(new Beam(this.#y, this.#x + 1, Dir.East));
							}
							break;
						default:
							if (this.#y + 1 < data.length) {
								ret.push(new Beam(this.#y + 1, this.#x, this.#dir));
							}
							break;
					}
				}
				break;
			case Dir.West:
				if (this.#x > -1) {
					switch (data[this.#y][this.#x]) {
						case '|':
							if (this.#y - 1 > -1) {
								ret.push(new Beam(this.#y - 1, this.#x, Dir.North));
							}
							if (this.#y + 1 < data.length) {
								ret.push(new Beam(this.#y + 1, this.#x, Dir.South));
							}
							break;
						case '/':
							if (this.#y + 1 < data.length) {
								ret.push(new Beam(this.#y + 1, this.#x, Dir.South));
							}
							break;
						case '\\':
							if (this.#y - 1 > -1) {
								ret.push(new Beam(this.#y - 1, this.#x, Dir.North));
							}
							break;
						default:
							if (this.#x - 1 > -1) {
								ret.push(new Beam(this.#y, this.#x - 1, this.#dir));
							}
							break;
					}
				}
				break;
			case Dir.East:
				if (this.#x < data[this.#y].length) {
					switch (data[this.#y][this.#x]) {
						case '|':
							if (this.#y - 1 > -1) {
								ret.push(new Beam(this.#y - 1, this.#x, Dir.North));
							}
							if (this.#y + 1 < data.length) {
								ret.push(new Beam(this.#y + 1, this.#x, Dir.South));
							}
							break;
						case '/':
							if (this.#y - 1 > -1) {
								ret.push(new Beam(this.#y - 1, this.#x, Dir.North));
							}
							break;
						case '\\':
							if (this.#y + 1 < data.length) {
								ret.push(new Beam(this.#y + 1, this.#x, Dir.South));
							}
							break;
						default:
							if (this.#x + 1 < data[this.#y].length) {
								ret.push(new Beam(this.#y, this.#x + 1, this.#dir));
							}
							break;
					}
				}
				break;
		}

		return ret;
	}

	#x;
	#y;
	#dir;
}

/**
 * 
 * @param {number} y 
 * @param {number} x 
 * @param {Dir} dir 
 * @param {string[][]} data 
 */
function processBeam(y, x, dir, data) {
	const beams = [new Beam(y, x, dir)];
	const lit = new Set([beams[0].yx]);
	const visited = new Set();
	while (beams.length) {
		/** @type {Beam[]} */
		const queue = [];
		while (beams.length) {
			const beam = beams.shift();
			lit.add(beam.yx);
			if (!visited.has(beam.yxd)) {
				queue.push(beam);
			}
			visited.add(beam.yxd);
		}

		while (queue.length) {
			const beam = queue.pop();
			const newBeams = [...beam.moveBeam(data)];
			beams.push(...newBeams);
		}
	}

	return lit.size;
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(''));
	return processBeam(0, 0, Dir.East, data);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(''));

	let maxLit = 0;

	for (let y = 0; y < data.length; y++) {
		maxLit = Math.max(
			maxLit,
			processBeam(y, 0, Dir.East, data),
			processBeam(y, data[y].length - 1, Dir.West, data)
		);
	}
	for (let x = 0; x < data[0].length; x++) {
		maxLit = Math.max(
			maxLit,
			processBeam(0, x, Dir.South, data),
			processBeam(data.length - 1, x, Dir.North, data)
		);
	}
	return maxLit;
};
