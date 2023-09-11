const sql = require("mssql");
const crypto = require("crypto");

class Employee {
	constructor(name, password) {
		this.employeeId = crypto.randomBytes(4).toString("hex"); //TODO: will be a randomly generated number
		this.name = name;
		this.password = password;
	}

	async save() {
		try {
			const connection = await sql.connect(config);
			const request = new sql.Request(connection);
			await request.query(`
                INSERT INTO employee (employeeId, name, password)
                VALUES ('${this.employeeId}', '${this.name}', '${this.password}')
            `);
			await connection.close();
		} catch (err) {
			console.error(err);
		}
	}

	async update() {
		try {
			const connection = await sql.connect(config);
			const request = new sql.Request(connection);
			await request.query(`
                UPDATE employee
                SET name = '${this.name}', password = '${this.password}'
                WHERE employeeId = '${this.employeeId}'
            `);
			await connection.close();
		} catch (err) {
			console.error(err);
		}
	}

	async delete() {
		try {
			const connection = await sql.connect(config);
			const request = new sql.Request(connection);
			await request.query(`
                DELETE FROM employee
                WHERE employeeId = '${this.employeeId}'
            `);
			await connection.close();
		} catch (err) {
			console.error(err);
		}
	}

	static async findById(employeeId) {
		try {
			const connection = await sql.connect(config);
			const request = new sql.Request(connection);
			const result = await request.query(`
                SELECT * FROM employee
                WHERE employeeId = '${employeeId}'
            `);
			await connection.close();
			if (result.recordset.length > 0) {
				const { name, password } = result.recordset[0];
				return new Employee(name, password);
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
			const connection = await sql.connect(config);
			const request = new sql.Request(connection);
			const result = await request.query(`
                SELECT * FROM employee
            `);
			await connection.close();
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

module.exports = Employee;
