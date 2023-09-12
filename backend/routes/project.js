const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");
const authenticate = require("../MiddleWare/JWTAuth");

// GET /projects
router.get("/", authenticate, async (req, res) => {
	try {
		const projects = await Project.findAll();
		res.json(projects);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// GET /projects/:projectId
router.get("/:projectId", authenticate, async (req, res) => {
	try {
		console.log(req.params.projectId);
		const project = await Project.findById(req.params.projectId);
		if (project) {
			res.json(project);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// POST /projects
router.post("/", authenticate, async (req, res) => {
	try {
		const { project_name, employeeIds } = req.body;
		const project = new Project(null, project_name, employeeIds);
		await project.save();
		res.json(project);
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// PUT /projects/:projectId
router.put("/:projectId", authenticate, async (req, res) => {
	try {
		const project = await Project.findById(req.params.projectId);
		if (project) {
			project.project_name = req.body.project_name;
			project.employeeIds = req.body.employeeIds;
			await project.update();
			res.json(project);
		} else {
			res.sendStatus(404);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500);
	}
});

// DELETE /projects/:projectId
router.delete("/:projectId", authenticate, async (req, res) => {
	try {
		const project = await Project.findById(req.params.projectId);
		if (project) {
			await project.delete();
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
