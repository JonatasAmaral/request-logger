const express = require("express");
const { requestLogger } = require("./consoleLogger");

const app = express();
app.use(express.json());
const port = 3000;

function handler(req, res) {
	requestLogger(req);
	res.send("The server is up to date and running! 🚀");
}
app.get("/", handler);
app.post("/", handler);

app.listen(port, () => {
	console.log(`The server is listening at port ${port}`);
});
