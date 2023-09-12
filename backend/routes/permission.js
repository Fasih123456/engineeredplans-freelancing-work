const express = require("express");
const router = express.Router();
const Permission = require("../Models/Permission");
const authenticate = require("../MiddleWare/JWTAuth");

// Example routes for the Permission class
router.post("/", authenticate, async (req, res) => {
	const { employeeId, permissionType } = req.body;
	const permission = new Permission(null, employeeId, permissionType);
	await permission.save();
	res.sendStatus(201);
});

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

// Example routes for the Permission class
router.get("/", authenticate, async (req, res) => {
	const permissions = await Permission.findAll();
	res.json(permissions);
});

router.get("/:permissionId", authenticate, async (req, res) => {
	const { permissionId } = req.params;
	const permission = await Permission.findById(permissionId);
	if (permission) {
		res.json(permission);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;
