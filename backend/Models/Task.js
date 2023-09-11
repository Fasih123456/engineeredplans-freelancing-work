const sql = require("mssql");
const crypto = require("crypto");
const { connect } = require("../Util/db");

class Task {
	constructor(taskId, employeeId, projectId) {
		this.taskId = taskId;
		this.employeeId = employeeId;
		this.projectId = projectId;
	}

	static async findById(taskId) {
		try {
			const request = new sql.Request(connect);
			request.input("taskId", sql.Int, taskId);
			const result = await request.query(`
        SELECT * FROM task
        WHERE taskId = @taskId
      `);
			await request.close();
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
			const request = new sql.Request(connect);
			const result = await request.query(`
        SELECT * FROM task
      `);
			await request.close();
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

module.exports = Project;
