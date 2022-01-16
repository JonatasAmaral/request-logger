const express = require("express");
const { consoleLogger, fileLogger } = require("./requestLogger");

const app = express();
app.use(express.json());
const port = 3000;

function handler(req, res) {
	consoleLogger(req);
	fileLogger(req, res);
}
app.get("/", handler);
app.post("/", handler);

app.listen(port, () => {
	console.log(`The server is listening at port ${port}`);
});
