import { Row, Col, Container, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeDisplay() {
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		axios
			.get("http://localhost:3001/employees", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setEmployees(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Table className="employee-table">
				<thead>
					<tr>
						<th>Employee Name</th>
						<th>Hours Tracked</th>
						<th>Hours Per Week</th>
						<th>Options</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee, index) => (
						<tr key={index}>
							<td>{employee.name}</td>
							<td>0</td>
							<td>0</td>
							<td>
								<i className="fa-solid fa-trash fa-icon"></i>
								<i className="fa-solid fa-pen-to-square fa-icon"></i>
								<i className="fa-solid fa-eye fa-icon"></i>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}

export default EmployeeDisplay;
