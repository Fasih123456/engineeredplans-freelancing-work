import Header from "../Components/Header";
import Menu from "../Components/Menu";

import { Row, Col, Container, Table } from "react-bootstrap";

function Projects() {
	const projects = [
		{ name: "Project 1", hours: 10, employees: "Sabih, Mustafa" },
		{ name: "Project 2", hours: 20, employees: "Idress, Fasih" },
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
								<Table>
									<thead>
										<tr>
											<th>Project Name</th>
											<th>Hours Tracked</th>
											<th>Employees Involved</th>
											<th>Options</th>
										</tr>
									</thead>
									<tbody>
										{projects.map((project, index) => (
											<tr key={index}>
												<td>{project.name}</td>
												<td>{project.hours}</td>
												<td>{project.employees}</td>
												<td>
													<button>
														View All Time
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

export default Projects;
