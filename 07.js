/**
 * @param {string} hand 
 */
function getHandType(hand) {
	const cardCount = Object.entries(hand.split('').reduce((acc, value) => (acc[value] ? ++acc[value] : (acc[value] = 1), acc), {}));
	let handType = 0; // High Card
	switch (cardCount.length) {
		case 1: // Five of a kind
			handType = 6;
			break;
		case 2: // Full house or four of a kind
			if (cardCount[0][1] == 4 || cardCount[1][1] == 4) {
				// Four of a kind
				handType = 5;
			} else {
				// Full House
				handType = 4;
			}
			break;
		case 3:
			if (cardCount[0][1] == 3 || cardCount[1][1] == 3 || cardCount[2][1] == 3) {
				// Three of a kind
				handType = 3;
			} else {
				// Two pair
				handType = 2;
			}
			break;
		case 4: // one pair
			handType = 1;
			break;
	}
	return [hand, handType];
}

/**
 * @param {string} a 
 * @param {string} b 
 */
function handSort(a, b) {
	const rankOrder = b[0][1] - a[0][1];
	if (rankOrder != 0) {
		return rankOrder;
	}
	for (let i = 0; i < 5; i++) {
		const order = cardSort(a[0][0][i], b[0][0][i]);
		if (order !== 0) return order;
	}
	return 0;
}

/**
 * @param {string} a 
 * @param {string} b 
*/
function cardSort(a, b) {
	const cardOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
	return cardOrder.indexOf(a) - cardOrder.indexOf(b);
}

/**
 * @param {string} hand 
 */
function getHandType2(hand) {
	const cardCount = Object.entries(hand.split('').reduce((acc, value) => (acc[value] ? ++acc[value] : (acc[value] = 1), acc), {}));
	const cardCountMap = new Map(cardCount);
	if (hand.indexOf('J') != -1) {
		const jCardCount = cardCountMap.get('J');
		if (jCardCount < 5) {
			cardCountMap.delete('J');
			cardCount.splice(0);
			cardCount.push(...Array.from(cardCountMap.entries()));
			cardCount.sort((a, b) => b[1] - a[1]);
			cardCount[0][1] += jCardCount;
		}
	}
	let handType = 0; // High Card
	switch (cardCount.length) {
		case 1: // Five of a kind
			handType = 6;
			break;
		case 2: // Full house or four of a kind
			if (cardCount[0][1] == 4 || cardCount[1][1] == 4) {
				// Four of a kind
				handType = 5;
			} else {
				// Full House
				handType = 4;
			}
			break;
		case 3:
			if (cardCount[0][1] == 3 || cardCount[1][1] == 3 || cardCount[2][1] == 3) {
				// Three of a kind
				handType = 3;
			} else {
				// Two pair
				handType = 2;
			}
			break;
		case 4:
			// One Pair
			handType = 1;
			break;
	}
	return [hand, handType];
}

/**
 * @param {string} a 
 * @param {string} b 
 */
function handSort2(a, b) {
	const rankOrder = b[0][1] - a[0][1];
	if (rankOrder != 0) {
		return rankOrder;
	}
	for (let i = 0; i < 5; i++) {
		const order = cardSort2(a[0][0][i], b[0][0][i]);
		if (order !== 0) return order;
	}
	return 0;
}

/**
 * @param {string} a 
 * @param {string} b 
*/
function cardSort2(a, b) {
	const cardOrder = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
	return cardOrder.indexOf(a) - cardOrder.indexOf(b);
}

/**
 * @param {string} d 
 */
export const part1 = async d => {
	const data = d.split('\n').map(e => e.split(' ').map((e, i) => (i == 1) ? parseInt(e, 10) : getHandType(e)));
	data.sort(handSort).reverse();
	return data.map((e, i) => (i + 1) * e[1]).reduce((p, c) => p + c);
};

/**
 * @param {string} d 
 */
export const part2 = async d => {
	const data = d.split('\n').map(e => e.split(' ').map((e, i) => (i == 1) ? parseInt(e, 10) : getHandType2(e)));
	data.sort(handSort2).reverse();
	return data.map((e, i) => (i + 1) * e[1]).reduce((p, c) => p + c);
};
