const sql = require("mssql");
const crypto = require("crypto");
const { pool } = require("../Util/db");

projectDataTypes = {
	projectId: sql.VarChar(8),
	project_name: sql.VarChar(255),
	employeeIds: sql.VarChar,
};

class Project {
	constructor(projectId = null, project_name = null, employeeIds = null) {
		this.projectId = projectId || crypto.randomBytes(2).toString("hex");
		this.project_name = project_name;
		this.employeeIds = employeeIds || [];
	}
	addEmployee(employee) {
		this.employeeIds.push(employee.employeeId);
	}

	async save() {
		try {
			const request = pool.request();
			request.input(
				"projectId",
				projectDataTypes.projectId,
				this.projectId
			);
			request.input(
				"project_name",
				projectDataTypes.project_name,
				this.project_name
			);
			request.input(
				"employeeIds",
				projectDataTypes.employeeIds,
				JSON.stringify(this.employeeIds)
			);
			await request.query(`
        INSERT INTO project (projectId, project_name, employeeIds)
        VALUES (@projectId, @project_name, @employeeIds)
      `);
		} catch (err) {
			console.error(err);
		}
	}

	static async findById(projectId) {
		try {
			const request = pool.request();
			//console.log(projectId);
			request.input("projectId", projectDataTypes.projectId, projectId);
			const result = await request.query(`
      SELECT project_name, employeeIds FROM project
      WHERE projectId = @projectId
    `);
			if (result.recordset.length > 0) {
				const { project_name, employeeIds } = result.recordset[0];
				const project = new Project(
					projectId,
					project_name,
					JSON.parse(employeeIds)
				);
				//const employees = await Project.findByProjectId(projectId);
				//employees.forEach((employee) => project.addEmployee(employee));
				return project;
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
      SELECT * FROM project
    `);
			return result.recordset.map(
				({ projectId, project_name, employeeIds }) =>
					new Project(
						projectId,
						project_name,
						JSON.parse(employeeIds)
					)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	static async findByEmployeeId(employeeId) {
		try {
			const request = pool.request();
			request.input(
				"employeeId",
				projectDataTypes.employeeIds,
				employeeId
			);
			const result = await request.query(`
				SELECT * FROM project
				WHERE employeeIds LIKE '%${employeeId}%'
			`);
			return result.recordset.map(
				({ projectId, project_name, employeeIds }) =>
					new Project(
						projectId,
						project_name,
						JSON.parse(employeeIds)
					)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	async update() {
		try {
			const request = pool.request();
			request.input(
				"projectId",
				projectDataTypes.projectId,
				this.projectId
			);
			request.input(
				"project_name",
				projectDataTypes.project_name,
				this.project_name
			);
			request.input(
				"employeeIds",
				projectDataTypes.employeeIds,
				JSON.stringify(this.employeeIds)
			);
			await request.query(`
        UPDATE project
        SET project_name = @project_name, employeeIds = @employeeIds
        WHERE projectId = @projectId
      `);
		} catch (err) {
			res.status("500");
			console.error(err);
		}
	}
}
module.exports = Project;
