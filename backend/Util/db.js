const sql = require("mssql");
const mysql = require("mysql2/promise");
require("dotenv").config();

config = {
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: parseInt(process.env.DB_PORT),
	options: {
		encrypt: process.env.DB_OPTIONS_ENCRYPT === "true",
		enableArithAbort: process.env.DB_OPTIONS_ENABLE_ARITH_ABORT === "true",
	},
};

async function connect() {
	try {
		const connection = await sql.connect(config);
		console.log(connection._connected);

		const request = new sql.Request();

		await connection.close();
	} catch (err) {
		console.error(err);
	}
}

module.exports = connect;

/*
Driver={ODBC Driver 18 for SQL Server}
;Server=tcp:coresysmologic.database.windows.net,
1433;
Database=engineeredplans-employeeportal;
Uid={your_user_name};Pwd={your_password_here};
Encrypt=yes;TrustServerCertificate=no;
Connection Timeout=30;
Authentication=ActiveDirectoryPassword
	*/
