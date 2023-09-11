const sql = require("mssql");
const crypto = require("crypto");
const { pool } = require("../Util/db");

dataTypes = {
	taskId: sql.VarChar,
	employeeId: sql.VarChar,
	projectId: sql.VarChar,
};

class Task {
	constructor(taskId = null, employeeId = null, projectId = null) {
		this.taskId = taskId || crypto.randomBytes(4).toString("hex");
		this.employeeId = employeeId;
		this.projectId = projectId;
	}

	async save() {
		try {
			const request = pool.request();
			request.input("taskId", dataTypes.taskId, this.taskId);
			request.input("employeeId", dataTypes.employeeId, this.employeeId);
			request.input("projectId", dataTypes.projectId, this.projectId);
			await request.query(`
        INSERT INTO task (taskId, employeeId, projectId)
        VALUES (@taskId, @employeeId, @projectId)
      `);
		} catch (err) {
			console.error(err);
		}
	}

	async update() {
		try {
			const request = pool.request();
			request.input("taskId", dataTypes.taskId, this.taskId);
			request.input("employeeId", dataTypes.employeeId, this.employeeId);
			request.input("projectId", dataTypes.projectId, this.projectId);
			await request.query(`
        UPDATE task
        SET employeeId = @employeeId, projectId = @projectId
        WHERE taskId = @taskId
      `);
		} catch (err) {
			console.error(err);
		}
	}

	async delete() {
		try {
			const request = pool.request();
			request.input("taskId", dataTypes.taskId, this.taskId);
			await request.query(`
        DELETE FROM task
        WHERE taskId = @taskId
      `);
		} catch (err) {
			console.error(err);
		}
	}

	static async findById(taskId) {
		try {
			const request = pool.request();
			request.input("taskId", dataTypes.taskId, taskId);
			const result = await request.query(`
        SELECT * FROM task
        WHERE taskId = @taskId
      `);

			if (result.recordset.length > 0) {
				const { employeeId, projectId } = result.recordset[0];
				return new Task(taskId, employeeId, projectId);
			} else {
				return null;
			}
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	static async findAll() {
		try {
			const request = pool.request();
			const result = await request.query(`
        SELECT * FROM task
      `);

			return result.recordset.map(
				({ taskId, employeeId, projectId }) =>
					new Task(taskId, employeeId, projectId)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}

module.exports = Task;
