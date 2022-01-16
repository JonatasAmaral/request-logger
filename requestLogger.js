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

function LogsCounter() {
	if (this.instance) return this.instance;

	let _count = 0;
	try {
		_count = parseInt(fs.readFileSync("_logs-counter.txt", "utf8"));
	} catch (err) {
		console.error("Couldn't read \"_logs-counter.txt\" file!");
	}

	this.instance = {
		get count() {
			return _count;
		},
		set count(value) {
			_count = value;
			fs.writeFile(`_logs-counter.txt`, `${_count}`, err => {
				if (err) console.error(`Couldn't persist "_logs-counter.txt" file!`);
			});
		}
	}
	return this.instance;
}

function fileLogger(req, res) {
	let data = dataFetch(req);
	let dateTime = new Date()
		.toISOString()
		.replaceAll(":", "-");
	const logsCounter = LogsCounter()

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
