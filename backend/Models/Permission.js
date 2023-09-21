const sql = require("mssql");
const crypto = require("crypto");
const { pool } = require("../Util/db");

permissionDataType = {
	permissionId: sql.VarChar,
	employeeId: sql.VarChar,
	permissionType: sql.VarChar,
};

class Permission {
	constructor(permissionId = null, employeeId = null, permissionType = null) {
		this.permissionId =
			permissionId || crypto.randomBytes(4).toString("hex");
		this.employeeId = employeeId;
		this.permissionType = permissionType;
	}

	async save() {
		try {
			const request = pool.request();
			request.input(
				"permissionId",
				permissionDataType.permissionId,
				this.permissionId
			);
			request.input(
				"employeeId",
				permissionDataType.employeeId,
				this.employeeId
			);
			request.input(
				"permissionType",
				permissionDataType.permissionType,
				this.permissionType
			);
			await request.query(`
        INSERT INTO permission (permissionId, employeeId, permissionType)
        VALUES (@permissionId, @employeeId, @permissionType)
      `);
		} catch (err) {
			console.error(err);
		}
	}

	static async findById(permissionId) {
		console.log(permissionId);
		console.log(permissionDataType);
		console.log(permissionDataType.permissionId);
		try {
			const request = pool.request();
			request.input(
				"permissionId",
				permissionDataType.permissionId,
				permissionId
			);
			const result = await request.query(`
                        SELECT * FROM permission
                        WHERE permissionId = @permissionId
                        `);

			console.log(result);
			if (result.recordset.length > 0) {
				const { employeeId, permissionType } = result.recordset[0];
				const permission = new Permission(
					permissionId,
					employeeId,
					permissionType
				);
				return permission;
			} else {
				return null;
			}
		} catch (error) {
			console.log(error);
		}
	}

	static async findByEmployeeId(employeeId) {
		try {
			const request = pool.request();
			request.input(
				"employeeId",
				permissionDataType.employeeId,
				employeeId
			);
			const result = await request.query(`
        SELECT  permissionId, permissionType
        FROM permission
        WHERE employeeId = @employeeId
      `);

			console.log(result);

			return result.recordset.map(
				({ permissionId, permissionType }) =>
					new Permission(permissionId, employeeId, permissionType)
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}

	//Only permissionType can be updated from here
	async update() {
		try {
			const request = pool.request();
			request.input(
				"permissionId",
				permissionDataType.permissionId,
				this.permissionId
			);
			request.input(
				"employeeId",
				permissionDataType.employeeId,
				this.employeeId
			);
			request.input(
				"permissionType",
				permissionDataType.permissionType,
				this.permissionType
			);
			await request.query(`
        UPDATE permission
        SET permissionType = @permissionType
        WHERE permissionId = @permissionId
      `);
		} catch (err) {
			console.error(err);
		}
	}

	static async delete(permissionId) {
		try {
			const request = pool.request();
			request.input(
				"permissionId",
				permissionDataType.permissionId,
				permissionId
			);
			await request.query(`
        DELETE FROM permission
        WHERE permissionId = @permissionId
      `);
		} catch (err) {
			console.error(err);
		}
	}

	static async findAll() {
		try {
			const request = pool.request();
			const result = await request.query(`
        SELECT * FROM permission
      `);
			return result.recordset.map(
				({ permissionId, employeeId, permissionType }) =>
					new Permission(permissionId, employeeId, permissionType)
			);
		} catch (error) {
			console.log(error);
			return [];
		}
	}
}

module.exports = Permission;
