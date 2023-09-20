import { Row, Col, Container, Table } from "react-bootstrap";

import React, { useState, useEffect } from "react";

import axios from "axios";

interface ProjectDisplayProps {
	accessLevel: string;
}

function ProjectDisplay({ accessLevel }: ProjectDisplayProps) {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			window.location.href = "/login";
		}

		const response = axios
			.get("http://localhost:3001/projects", {
				params: {
					employeeId: localStorage.getItem("employeeId"),
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setProjects(response.data);
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
