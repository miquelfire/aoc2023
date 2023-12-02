/**
 * @param {string} d 
 */
export const part1 = async d => {
	const maxCubes = {red: 12, green: 13, blue: 14};
	const data = d.split('\n')
		.map(e => {
			const gameInfo = e.match(/Game (\d+): (.+)/);
			//console.log(gameInfo);
			return [
				parseInt(gameInfo[1], 10),
				gameInfo[2].split(';').map(
					e => {
						const cubes = {red: 0, green: 0, blue: 0};
						e.split(',').map(e => {
							const handful = e.trim().split(' ');
							cubes[handful[1]] = parseInt(handful[0], 10);
						});
						return cubes;
					})
			];
		})
		.filter(e => {
			let ret = true;
			e[1].forEach(e => {
				if (e.red > maxCubes.red || e.green > maxCubes.green || e.blue > maxCubes.blue) {
					ret = false;
				}
			});
			return ret;
		})
		.reduce((p, v) => p + v[0], 0);
	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n');
	return [];
};
