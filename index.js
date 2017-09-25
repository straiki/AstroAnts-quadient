let shortestPath = require('./shortestPath');
let request = require('request-promise-native');
let u = require('./utils');
let config = require('./options');

async function main() {
	let json = /** @type {AstroAnts} */ await request(config.initOptions);

	let id = json.id;
	let map = json.map;
	let areas = map.areas;

	let startTimer = new Date();
	let transformed = u.buildArray(areas);

	let {totalDistance, path} = shortestPath(transformed, json.astroants, json.sugar);

	console.log(`Processing time took ${new Date().valueOf() - startTimer.valueOf()} ms.`);

	let sendResult = await request(config.endOptions(id, path.join("")));

	console.log(`Done on time: ${sendResult.inTime}, success: ${sendResult.valid}`);
	console.log(`Total cost: ${totalDistance}, path: ${path.join("")} `);
}

main().then().catch(() => {
	console.log("Some error happened ;)")
});

/**
 * @typedef {object} AstroAnts
 * @property {{areas: Array.<string>}} map
 * @property {Position} astroAnts
 * @property {Position} sugar
 * @property {number} id
 */

/**
 * @typedef {object} Position
 * @property {number} x
 * @property {number} y
 */