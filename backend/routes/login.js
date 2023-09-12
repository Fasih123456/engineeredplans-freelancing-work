const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../Util/db");
const Employee = require("../Models/Employee");
const router = require("express").Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	// Verify username and password against the database
	const employee = await Employee.checkVerification(username, password);

	if (!employee) {
		return res
			.status(401)
			.json({ message: "Invalid username or password" });
	}

	// Generate a JWT for the authenticated user
	const token = jwt.sign(
		{ employeeId: employee.employeeId },
		process.env.JWT_SECRET,
		{
			expiresIn: "2h",
		}
	);

	res.json({ token });
});
module.exports = router;
