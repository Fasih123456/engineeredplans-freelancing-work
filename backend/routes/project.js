const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");
const authenticate = require("../MiddleWare/JWTAuth");
const Permission = require("../Models/Permission");

//Client required Admin permission to view all projects
router.get("/", authenticate, async (req, res) => {
	try {
		const employeeId = req.employeeId;
		//console.log("emplyoee id", employeeId);
		const PermissionStatus = await Permission.findByEmployeeId(employeeId);
		//console.log("permission status", PermissionStatus);
		if (PermissionStatus[0].permissionType == "admin") {
			const projects = await Project.findAll();
			console.log("projects", projects);
			res.status(200).json(projects);
		} else {
			res.status(403).json({
				message: "Admin privilege required for this route",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

//Gets the project which an employee is assigned to using employeeId
router.get("/:employeeId", authenticate, async (req, res) => {
	try {
		//console.log(req.params);
		const project = await Project.findByEmployeeId(req.params.employeeId);
		//console.log("project", project);
		if (project) {
			res.status(200).json(project);
		} else {
			res.status(204).json({
				message: "No project found for this employee",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

//Post a new project with the project name and assigned employees
router.post("/", authenticate, async (req, res) => {
	try {
		const { project_name, employeeIds } = req.body;
		const project = new Project(null, project_name, employeeIds);

		await project.save();
		res.status(200).json(project);
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

//updates the project name and the assigned employees using projectId
router.put("/:projectId", authenticate, async (req, res) => {
	try {
		const project = await Project.findById(req.params.projectId);
		if (project) {
			project.project_name = req.body.project_name;
			project.employeeIds = req.body.employeeIds;
			await project.update();
			res.status(200).json(project);
		} else {
			res.status(204).json({
				message: "No project found for this employee",
			});
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

// deletes a project from the list of projects using projectId
router.delete("/:projectId", authenticate, async (req, res) => {
	try {
		const project = await Project.findById(req.params.projectId);
		if (project) {
			await project.delete();
			res.status(204).json({
				message: "Project Deleted",
			});
		} else {
			res.status(404);
		}
	} catch (err) {
		console.error(err);
		res.status(500);
	}
});

module.exports = router;
