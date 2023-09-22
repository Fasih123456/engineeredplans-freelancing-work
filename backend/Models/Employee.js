const sql = require("mssql");
const crypto = require("crypto");
const { pool } = require("../Util/db");
const Permission = require("./Permission");

dataTypes = {
	employeeId: sql.VarChar,
	name: sql.VarChar,
	password: sql.VarChar,
};

class Employee {
	constructor(name = null, password = null, employeeId = null) {
		this.employeeId = employeeId || crypto.randomBytes(4).toString("hex");
		this.name = name;
		this.password = password
			? crypto.createHash("sha256").update(password).digest("hex")
			: null;
	}

	async save() {
		try {
			const request = pool.request();
			await request
				.input("employeeId", sql.VarChar, this.employeeId)
				.input("name", sql.VarChar, this.name)
				.input("password", sql.VarChar, this.password).query(`
          INSERT INTO employee (employeeId, name, password)
          VALUES (@employeeId, @name, @password)
        `);

			const permission = new Permission(null, this.employeeId, "user");
			await permission.save();
		} catch (err) {
			console.error(err);
		}
	}
	static async checkVerification(name, password) {
		try {
			const request = pool.request();
			request.input("name", sql.VarChar, name);
			request.input("password", sql.VarChar, password);
			const result = await request.query(`
      SELECT * FROM employee
      WHERE name = @name AND password = @password
    `);
			if (result.recordset.length === 0) {
				return null;
			}

			const employee = result.recordset[0];
			return new Employee(
				employee.name,
				employee.password,
				employee.employeeId
			);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async update(currentEmployee, newName) {
		try {
			const request = pool.request();
			await request
				.input("employeeId", sql.VarChar, currentEmployee)
				.input("name", sql.VarChar, newName).query(`
        UPDATE employee
        SET name = @name
        WHERE employeeId = @employeeId
      `);

			console.log(currentEmployee, newName);
		} catch (err) {
			console.error(err);
		}
	}

	static async delete(employeeId) {
		console.log(employeeId);
		try {
			const request = pool.request();
			request.input("employeeId", dataTypes.employeeId, employeeId);
			await request.query(`
      DELETE FROM permission
      WHERE employeeId = @employeeId
    `);
			await request.query(`
      UPDATE task
      SET employeeId = NULL
      WHERE employeeId = @employeeId
    `);
			await request.query(`
      DELETE FROM employee
      WHERE employeeId = @employeeId
    `);
		} catch (err) {
			console.error(err);
		}
	}
	static async findById(employeeId) {
		try {
			const request = pool.request();
			request.input("employeeId", dataTypes.employeeId, employeeId);
			const result = await request.query(`
      SELECT * FROM employee
      WHERE employeeId = @employeeId
    `);

			if (result.recordset.length > 0) {
				const { name, password } = result.recordset[0];
				return new Employee(name, password, employeeId);
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
      SELECT employeeId, name FROM employee
    `);

			return result.recordset.map(
				({ employeeId, name }) => new Employee(name, null, employeeId)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}

module.exports = Employee;
