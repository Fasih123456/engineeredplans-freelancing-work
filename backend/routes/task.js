const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const authenticate = require("../MiddleWare/JWTAuth");

// Find all tasks for all employees
router.get("/", authenticate, async (req, res) => {
	try {
		const tasks = await Task.findAll();
		res.status(200).json(tasks);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// finds all tasks for a specific employee using employeeId
router.get("/:employeeId", authenticate, async (req, res) => {
	try {
		const task = await Task.findByEmployeeId(req.params.employeeId);
		//console.log("task", task);
		if (task) {
			res.status(200).json(task);
		} else {
			res.status(204).json({
				message: "No task found for this employee",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

//Posts a new task
router.post("/", authenticate, async (req, res) => {
	try {
		console.log(req.body);
		const { employeeId, projectId, date, time } = req.body;
		const task = new Task(null, employeeId, projectId, date, time);
		console.log(task);
		await task.save();
		res.status(200).json(task); // Combined response
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// PUT /tasks/:taskId
router.put("/:taskId", authenticate, async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		if (task) {
			task.employeeId = req.body.employeeId;
			task.projectId = req.body.projectId;
			await task.update();
			res.status(200).json(task);
		} else {
			res.sendStatus(204).json({
				message: "No task found for this employee",
			});
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// DELETE /tasks/:taskId
router.delete("/:taskId", authenticate, async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		if (task) {
			await task.delete();
			res.sendStatus(204).json({ message: "Task deleted" });
		} else {
			res.sendStatus(204).json({ message: "No task with this Id found" });
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;
