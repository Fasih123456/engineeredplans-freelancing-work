//React imports
import { serverRequest } from "../GlobalFunctions";
import { useState, useEffect } from "react";
//Library imports
import { Table } from "react-bootstrap";

interface Project {
	projectId: number;
	project_name: string;
	employeeIds: string;
}

function ProjectDisplay() {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		serverRequest({
			method: "get",
			url: "projects",
			params: {
				employeeId: localStorage.getItem("employeeId"),
			},
		})
			.then((response) => {
				console.log(response);
				setProjects(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

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
						<td>{project.project_name}</td>
						<td>0</td>
						<td>{project.employeeIds}</td>
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
