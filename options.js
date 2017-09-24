let gridSize = 300;
let optionsGet = {
	uri: "http://tasks-rad.quadient.com:8080/task",
	json: true
};
let optionsPost = (id, data) => {
	return {
		uri: "http://tasks-rad.quadient.com:8080/task/" + id,
		method: "PUT",
		json: true,
		headers: {
			"Content-Type": "application/json",
		},
		body: {path: data}
	};
};

module.exports = {
	initOptions: optionsGet,
	endOptions: optionsPost,
	gridSize: gridSize
};