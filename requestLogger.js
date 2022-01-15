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

module.exports = { consoleLogger };
