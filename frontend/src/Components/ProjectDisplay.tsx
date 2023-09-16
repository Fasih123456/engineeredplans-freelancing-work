import { Row, Col, Container, Table } from "react-bootstrap";

function ProjectDisplay() {
	const projects = [
		{ name: "Project 1", hours: 10, employees: "Sabih, Mustafa" },
		{ name: "Project 2", hours: 20, employees: "Idress, Fasih" },
	];

	return (
		<Table className="projects-table">
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
							<button className="projects-btn">
								View All Time
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default ProjectDisplay;
