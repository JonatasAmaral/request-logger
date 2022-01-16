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

const logsCounter = {
	_count: 0,
	get count() {
		return this._count;
	},
	set count(value) {
		this._count = value;
		fs.writeFile(`_logs-counter.txt`, `${this._count}`, err => {
			if (err) console.error(`Couldn't persist "_logs-counter.txt" file!`);
		});
	},
}
try {
	logsCounter.count = parseInt(fs.readFileSync("_logs-counter.txt", "utf8"));
} catch (err) {
	console.error("Couldn't read \"_logs-counter.txt\" file!");
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
		`logs/request#${logsCounter.count + 1}-${dateTime}.json`,
		data,
		err => {
			if (err) res.status(500).send("Fail to write log file!");
			else {
				++logsCounter.count
				res.send("Log file saved!");
			}
		}
	);
}

module.exports = { consoleLogger, fileLogger };
