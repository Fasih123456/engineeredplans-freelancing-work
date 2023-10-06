const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const authenticate = require("../MiddleWare/JWTAuth");

// GET /tasks
router.get("/", authenticate, async (req, res) => {
	try {
		const tasks = await Task.findAll();
		res.json(tasks);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// GET /tasks/:taskId
router.get("/:employeeId", authenticate, async (req, res) => {
	try {
		const task = await Task.findByEmployeeId(req.params.employeeId);
		console.log("task", task);
		if (task) {
			res.status(200).json(task);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

router.get("/:employeeId/:projectId", authenticate, async (req, res) => {
	try {
		const task = await Task.findByTaskId(
			req.params.employeeId,
			req.params.projectId
		);
		console.log("task", task);
		if (task) {
			res.status(200).json(task);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// POST /tasks
router.post("/", authenticate, async (req, res) => {
	try {
		console.log(req.body);
		const { employeeId, projectId, date, time } = req.body;
		const task = new Task(null, employeeId, projectId, date, time);
		await task.save();
		res.status(201).json(task); // Combined response
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
			res.json(task);
		} else {
			res.sendStatus(404);
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
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

module.exports = router;
