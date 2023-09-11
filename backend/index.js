const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const connect = require("./Util/db");
const json = require("body-parser").json;
const urlencoded = require("body-parser").urlencoded;

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(json());
app.use(urlencoded({ extended: true }));

connect(); //This connects the database to the server

app.get("/", cors(), async (req, res) => {
	try {
		await connect();
		res.send("Hello World!");
	} catch (error) {
		console.error(`Error connecting to database: ${error}`);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
