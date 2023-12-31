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

		await connection.close();
	} catch (err) {
		console.error(err);
	}
}

const pool = new sql.ConnectionPool(config);

pool.connect((err) => {
	if (err) {
		console.error(err);
	} else {
		console.log("Connected to SQL Server");
	}
});

module.exports = {
	connect,
	config,
	pool,
};
