let config = require('./options');

/**
 * @param {Array.<string>} areasArray
 * @returns {Array.<Array.<Object>>}
 */
function build(areasArray) {
	let output = [];
	let transformed = [];

	for (let i = 0; i < config.gridSize; i++) {
		transformed.push([]);
		for (let j = 0; j < config.gridSize; j++) {
			transformed[i].push([]);
		}
	}

	for (let i = 0; i < config.gridSize; i++) {
		output.push(areasArray.slice(i * config.gridSize, i * config.gridSize + config.gridSize));
	}

	let sizeOfArray = output.length;
	while (sizeOfArray--) {
		let inner = output[sizeOfArray];
		let sizeOfInnerArray = inner.length;
		while (sizeOfInnerArray--) {
			let obj = inner[sizeOfInnerArray];
			let split = obj.split("-");
			let value = split[0];
			let connections = [];

			foreach(split[1], (direction) => {
				let connection = {x: sizeOfInnerArray, y: sizeOfArray, direction: ""};
				switch (direction) {
				case "L":
					connection.x--;
					connection.direction = "L";
					break;
				case "U":
					connection.y--;
					connection.direction = "U";
					break;
				case "D":
					connection.y++;
					connection.direction = "D";
					break;
				case "R":
					connection.x++;
					connection.direction = "R";
					break;
				}
				connections.push(connection);
			});
			transformed[sizeOfArray][sizeOfInnerArray] = {
				x: sizeOfInnerArray,
				y: sizeOfArray,
				distance: 1 / 0,
				value: value,
				connections: connections,
				previous: null
			}
		}
	}
	return transformed;
}

function foreach(iterable, fn) {
	let i = 0;
	let len = iterable.length;
	for (; i < len; i++) {
		fn(iterable[i])
	}
}


module.exports = {
	buildArray: build,
	foreach: foreach
};