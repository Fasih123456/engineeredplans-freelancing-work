const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3001;

const { connect } = require("./Util/db");
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

app.use("/employees", require("./routes/employee"));
app.use("/projects", require("./routes/project"));
app.use("/tasks", require("./routes/task"));
app.use("/permission", require("./routes/permission"));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
