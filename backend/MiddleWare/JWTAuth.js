const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Missing token" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.employeeId = decoded.employeeId;
		next();
	} catch (error) {
		console.error(error);
		res.status(401).json({ message: "Invalid token" });
	}
}

module.exports = authenticate;
