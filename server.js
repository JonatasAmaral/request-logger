const express = require("express");
const { consoleLogger } = require("./requestLogger");

const app = express();
app.use(express.json());
const port = 3000;

function handler(req, res) {
	consoleLogger(req);
	res.send("The server is up to date and running! 🚀");
}
app.get("/", handler);
app.post("/", handler);

app.listen(port, () => {
	console.log(`The server is listening at port ${port}`);
});
