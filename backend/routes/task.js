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
router.get("/:taskId", authenticate, async (req, res) => {
	try {
		const task = await Task.findById(req.params.taskId);
		if (task) {
			res.json(task);
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
		const { employeeId, projectId } = req.body;
		const task = new Task(null, employeeId, projectId);
		await task.save();
		res.json(task);
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
