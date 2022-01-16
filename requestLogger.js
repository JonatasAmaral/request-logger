const fs = require("fs");

function dataFetch(req) {
	return JSON.stringify(
		{
			method: req.method,
			headers: req.headers,
			query: req.query,
			body: req.body,
		},
		null,
		"\t"
	);
}

function consoleLogger(req) {
	let data = dataFetch(req);
	console.log(data);
}

function fileLogger(req, res) {
	let data = dataFetch(req);
	let dateTime = new Date()
		.toISOString()
		.replaceAll(":", "-");

	fs.mkdir("logs", { recursive: true }, err => {
		if (err) throw err;
	});
	fs.writeFile(
		`logs/request-${dateTime}.json`,
		data,
		err => {
			if (err) res.status(500).send("Fail to write log file!");
			else res.send("Log file saved!");
		}
	);
}

module.exports = { consoleLogger, fileLogger };
