import Header from "../../Components/Header";
import Menu from "../../Components/Menu";

import { Row, Col, Container, Table } from "react-bootstrap";

function EmployeeManagement() {
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
			<Header />
			<Container fluid>
				<Row>
					<Col xs={2}>
						<Menu />
					</Col>
					<Col xs={10}>
						<Container className="wrapper">
							<Row>
								<Col>
									<button>Create Employee</button>
								</Col>
							</Row>
							<Row>
								<Table>
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
													<button>
														Delete Employee
													</button>
													<button>
														Edit Employee
													</button>
													<button>
														View All Time Instances
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EmployeeManagement;
