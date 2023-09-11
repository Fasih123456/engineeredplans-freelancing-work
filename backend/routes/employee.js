const express = require("express");
const router = express.Router();
const Employee = require("../Models/Employee");

// GET /employees
router.get("/employees", async (req, res) => {
	const employees = await Employee.findAll();
	res.json(employees);
});

// GET /employees/:employeeId
router.get("/employees/:employeeId", async (req, res) => {
	console.log(req.params.employeeId);
	const employee = await Employee.findById(req.params.employeeId);
	if (employee) {
		res.json(employee);
	} else {
		res.sendStatus(404);
	}
});

// POST /employees
router.post("/employees", async (req, res) => {
	const { name, password } = req.body;
	const employee = new Employee(name, password);
	await employee.save();
	res.json(employee);
});

// PUT /employees/:employeeId
router.put("/employees/:employeeId", async (req, res) => {
	const employee = await Employee.findById(req.params.employeeId);
	console.log(employee);
	if (employee) {
		employee.name = req.body.name;
		employee.password = req.body.password;
		await employee.update(
			employee.employeeId,
			req.body.name,
			req.body.password
		);
		res.json(employee);
	} else {
		res.sendStatus(404);
	}
});

// DELETE /employees/:employeeId
router.delete("/employees/:employeeId", async (req, res) => {
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
