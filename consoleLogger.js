function requestLogger(req) {
	let data = JSON.stringify(
		{
			method: req.method,
			headers: req.headers,
			query: req.query,
			body: req.body,
		},
		null,
		"\t"
	);

	console.log(data);
}

module.exports = { requestLogger };
