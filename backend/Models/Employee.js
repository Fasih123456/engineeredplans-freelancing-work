const sql = require("mssql");
const crypto = require("crypto");
const { connect, pool } = require("../Util/db");

dataTypes = {
	employeeId: sql.VarChar,
	name: sql.VarChar,
	password: sql.VarChar,
};

class Employee {
	constructor(employeeId = null, name = null, password = null) {
		this.employeeId = employeeId;
		this.name = name;
		this.password = password;
	}

	async save() {
		try {
			const request = pool.request();
			await request
				.input("employeeId", dataTypes.employeeId, this.employeeId)
				.input("name", dataTypes.name, this.name)
				.input("password", dataTypes.password, this.password).query(`
          INSERT INTO employee (employeeId, name, password)
          VALUES (@employeeId, @name, @password)
        `);
		} catch (err) {
			console.error(err);
		}
	}
	async update(currentEmployee, newName, newPassword) {
		try {
			const request = pool.request();
			await request
				.input("employeeId", dataTypes.employeeId, currentEmployee)
				.input("name", dataTypes.name, newName)
				.input("password", dataTypes.password, newPassword).query(`
        UPDATE employee
        SET name = @name, password = @password
        WHERE employeeId = @employeeId
      `);

			console.log(currentEmployee, newName, newPassword);
		} catch (err) {
			console.error(err);
		}
	}

	async delete(employeeId) {
		console.log(employeeId);
		try {
			const request = pool.request();
			await request.input("employeeId", dataTypes.employeeId, employeeId)
				.query(`
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
				return new Employee(employeeId, name, password);
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
      SELECT * FROM employee
    `);

			return result.recordset.map(
				({ employeeId, name, password }) =>
					new Employee(employeeId, name, password)
			);
		} catch (err) {
			console.error(err);
			return [];
		}
	}
}

module.exports = Employee;
