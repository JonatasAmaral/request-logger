const express = require("express");

const app = express();
const port = 3000;

function handler(req, res) {
	res.send("The server is up and running! 🚀");
}
app.get("/", handler);
app.post("/", handler);

app.listen(port, () => {
	console.log(`The server is listening at port ${port}`);
});
