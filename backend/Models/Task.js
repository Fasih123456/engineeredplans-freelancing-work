const sql = require("mssql");
const crypto = require("crypto");
const { pool } = require("../Util/db");

dataTypes = {
	taskId: sql.VarChar,
	employeeId: sql.VarChar,
	projectId: sql.VarChar,
};

class Task {
	constructor(
		taskId = null,
		employeeId = null,
		projectId = null,
		date = null,
		time = null
	) {
		this.taskId = taskId || crypto.randomBytes(4).toString("hex");
		this.employeeId = employeeId;
		this.projectId = projectId;
		this.date = date;
		this.time = time;
	}

	async save() {
		try {
			const request = pool.request();
			request.input("taskId", dataTypes.taskId, this.taskId);
			request.input("employeeId", dataTypes.employeeId, this.employeeId);
			request.input("projectId", dataTypes.projectId, this.projectId);
			request.input("date", dataTypes.date, this.date);
			request.input("time", dataTypes.time, this.time);
			await request.query(`
      INSERT INTO task (taskId, employeeId, projectId, date, time)
      VALUES (@taskId, @employeeId, @projectId, @date, @time)
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
			request.input("date", dataTypes.date, this.date);
			request.input("time", dataTypes.time, this.time);
			await request.query(`
      UPDATE task
      SET employeeId = @employeeId, projectId = @projectId, date = @date, time = @time
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
				const { employeeId, projectId, date, time } =
					result.recordset[0];
				return new Task(taskId, employeeId, projectId, date, time);
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
				({ taskId, employeeId, projectId, date, time }) =>
					new Task(taskId, employeeId, projectId, date, time)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}

module.exports = Task;
