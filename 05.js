import { deepCopy } from './utils.js';

/**
 * @param {string} almanac 
 */
function getConversions(almanac) {
	const conversions = almanac.split('\n').map(e => e.split(' '));
	conversions.shift()[0];
	conversions.forEach((e, i) => {
		// Change to BigInt
		conversions[i] = e.map(e => BigInt(e));
		// Convert the second number to the amount to change the input in the range of this line
		conversions[i][0] = conversions[i][0] - conversions[i][1];
		// Set the start and end for the range
		conversions[i][1] = [conversions[i][1], conversions[i][2] + conversions[i][1]];
		// Don't need the range amount now
		conversions[i].pop();
	});

	return conversions;
}

/**
 * @param {string} almanac 
 * @param {Array} seeds 
 */
function handleConversion(almanac, inputs) {
	const conversions = almanac.split('\n').map(e => e.split(' '));
	conversions.shift()[0];
	conversions.forEach((e, i) => {
		// Change to BigInt
		conversions[i] = e.map(e => BigInt(e));
		// Convert the second number to the amount to change the input in the range of this line
		conversions[i][0] = conversions[i][0] - conversions[i][1];
		// Set the start and end for the range
		conversions[i][1] = [conversions[i][1], conversions[i][2] + conversions[i][1]];
		// Don't need the range amount now
		conversions[i].pop();
	});

	inputs.forEach((input, i) => {
		const convert = conversions.filter(e => input >= e[1][0] && input < e[1][1]);
		if (convert.length) {
			inputs[i] += convert[0][0];
		}
	});
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n\n');
	const seeds = data.shift().split(' ').slice(1).map(e => BigInt(e));

	data.forEach(e => handleConversion(e, seeds));

	return seeds.reduce((m, e) => e < m ? e : m); // Use this instead of Math.min because of BigInt types
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n\n');
	const seedInput = data.shift().split(' ').slice(1).map(e => BigInt(e));
	const seeds = [];
	const conversions = data.map(e => getConversions(e));
	let minSeedValue = 999999999999999999999n;

	for (let i = 0; i < seedInput.length; i += 2) {
		seeds.push([seedInput[i], seedInput[i] + seedInput[i + 1]]);
	}

	seeds.forEach(seed => {
		const seedRanges = [seed];

		conversions.forEach(e => {
			const seedQueue = structuredClone(seedRanges);
			seedRanges.splice(0, seedRanges.length);
			for (let i = 0; i < e.length; i++) {
				const seed2Queue = structuredClone(seedQueue);
				seedQueue.splice(0);
				for (let seedRange; seedRange = seed2Queue.shift();) { // eslint-disable-line no-cond-assign
					if (seedRange[0] >= e[i][1][0] && seedRange[0] < e[i][1][1] && seedRange[1] >= e[i][1][0] && seedRange[1] < e[i][1][1]) {
						seedRange[0] += e[i][0];
						seedRange[1] += e[i][0];
						seedRanges.push(seedRange);
					} else if (seedRange[0] < e[i][1][1] && seedRange[1] >= e[i][1][0]) {
						if (seedRange[0] < e[i][1][0]) {
							// Send the first part back to the queue make this range start at the current
							seed2Queue.push([seedRange[0], e[i][1][0] - 1n]);
							// Set the start of the range to where the check begin
							seedRange[0] = e[i][1][0];
						}
						if (seedRange[1] >= e[i][1][1]) {
							seed2Queue.push([seedRange[0], e[i][1][1] - 1n]);
							seed2Queue.push([e[i][1][1], seedRange[1]]);
						} else {
							seed2Queue.push(seedRange);
						}
					} else {
						seedQueue.push(seedRange);
					}

				}
			}
			seedRanges.push(...seedQueue);
		});

		const lowestSeedValue = seedRanges.map(e => e[0]).reduce((p, v) => (p < v ? p : v));
		minSeedValue = lowestSeedValue < minSeedValue ? lowestSeedValue : minSeedValue;
	});
	return minSeedValue;
};
