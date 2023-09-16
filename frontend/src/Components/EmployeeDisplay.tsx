import { Row, Col, Container, Table } from "react-bootstrap";

function EmployeeDisplay() {
	const projects = [
		{
			name: "Sabih",
			hours: 10,
			hoursweek: 5,
		},
		{
			name: "Fasih",
			hours: 20,
			hoursweek: 5,
		},
	];

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
					{projects.map((project, index) => (
						<tr key={index}>
							<td>{project.name}</td>

							<td>{project.hours}</td>
							<td> {project.hoursweek}</td>

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
