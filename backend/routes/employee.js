const express = require("express");
const router = express.Router();
const Employee = require("../Models/Employee");
const authenticate = require("../MiddleWare/JWTAuth");

// GET /employees
router.get("/", authenticate, async (req, res) => {
	const employees = await Employee.findAll();
	res.json(employees);
});

// GET /employees/:employeeId
router.get("/:employeeId", authenticate, async (req, res) => {
	console.log(req.params.employeeId);
	const employee = await Employee.findById(req.params.employeeId);
	if (employee) {
		res.json(employee);
	} else {
		res.sendStatus(404);
	}
});

// POST /employees
router.post("/", authenticate, async (req, res) => {
	console.log(req.body);
	const { name, password } = req.body;
	const employee = new Employee(name, password);
	console.log(employee);
	await employee.save();
	res.json(employee);
});

// PUT /employees/:employeeId
router.put("/:employeeId", authenticate, async (req, res) => {
	const employee = new Employee(req.body.username, null, req.body.employeeId);
	await employee.update(req.body.employeeId, req.body.username, null);
	res.sendStatus(204);
});

// DELETE /employees/:employeeId
router.delete("/:employeeId", authenticate, async (req, res) => {
	const employee = await Employee.findById(req.params.employeeId);
	console.log(employee);
	if (employee) {
		await employee.delete(employee.employeeId);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
