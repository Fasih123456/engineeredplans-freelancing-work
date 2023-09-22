const express = require("express");
const router = express.Router();
const Permission = require("../Models/Permission");
const authenticate = require("../MiddleWare/JWTAuth");

router.put("/:permissionId", authenticate, async (req, res) => {
	const { permissionId } = req.params;
	const { permissionType } = req.body;
	const permission = await Permission.findById(permissionId);
	if (permission) {
		permission.permissionType = permissionType;
		await permission.update();
		res.sendStatus(200);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:permissionId", authenticate, async (req, res) => {
	const { permissionId } = req.params;
	await Permission.delete(permissionId);
	res.sendStatus(200);
});

router.get("/", authenticate, async (req, res) => {
	const permissions = await Permission.findAll();
	res.status(200).json(permissions);
});

router.get("/:employeeId", authenticate, async (req, res) => {
	const { employeeId } = req.params;
	const permission = await Permission.findByEmployeeId(employeeId);
	if (permission) {
		res.status(200).json(permission);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
