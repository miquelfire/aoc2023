/**
 * @param {string} d 
 */
export const part1 = async d => {
	const cardMatch = /Card +\d+: +([ \d]+) \| (.*)/;
	const data = d.split('\n')
		.map(card => {
			const matchedNumbers = [];
			const [,winningNumbers, yournumbers] = card.match(cardMatch).map(e => e.split(/ +/g));
			matchedNumbers.push(...winningNumbers.filter(number => yournumbers.includes(number)));
			if (matchedNumbers.length > 0) {
				return 2 ** (matchedNumbers.length - 1);
			}
			return 0;
		})
		.reduce((p, v) => p + v, 0);

	return data;
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const cardMatch = /Card +\d+: +([ \d]+) \| (.*)/;
	const data = d.split('\n')
		.map(card => {
			const matchedNumbers = [];
			const [,winningNumbers, yournumbers] = card.match(cardMatch).map(e => e.split(/ +/g));
			matchedNumbers.push(...winningNumbers.filter(number => yournumbers.includes(number)));
			return [1, matchedNumbers.length];
		})
		.map((card, index, data) => {
			for (let i = index + 1; i <= index + card[1]; i++) {
				data[i][0] += card[0];
			}
			return (card[0]);
		})
		.reduce((p, v) => p + v, 0);

	return data;
};
