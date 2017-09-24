let priorityQueue = require('./priorityQueue');
let u = require('./utils');

function shortestPath(data, start, end) {
	let selected = getNode(data, start);
	let result = [];
	getNode(data, start).distance = 0;
	// data[start.y][start.x].distance = 0;

	fillQueue(data, getNode(data, start));

	while (priorityQueue.length) {
		selected = getNode(data, priorityQueue.pop());

		if (selected === getNode(data, end)) {
			result = buildPath(selected);
			break;
		}
		fillQueue(data, selected);
	}

	return {totalDistance: selected.distance, path: result};
}

function fillQueue(data, innerItem) {
	u.foreach(innerItem.connections, (item) => {
		let node = getNode(data, item);
		let newDistance = innerItem.distance + Number(node.value);

		if (newDistance < node.distance) {
			node.distance = innerItem.distance + Number(node.value);
			node.previous = {direction: item.direction, node: innerItem};
			priorityQueue.push(node, node.distance);
		}
	});
}

function getNode(data, position) {
	return data[position.y][position.x];
}

function buildPath(node) {
	let lastNode = node;
	let result = [];
	while (lastNode.previous) {
		result.unshift(lastNode.previous.direction);
		lastNode = lastNode.previous.node;
	}
	return result;
}

module.exports = shortestPath;