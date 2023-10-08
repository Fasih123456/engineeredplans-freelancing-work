import React, { useEffect, useState } from "react";
import { serverRequest } from "../../../GlobalFunctions";
import { Col, Dropdown } from "react-bootstrap";

//Global Interfaces
import { ProjectInterface } from "../../../GlobalInterface";

interface AddProjectLinkProps {
	plevel: string;
	width: number;
	isActive: boolean;
	setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
	setSelectProjectId: React.Dispatch<React.SetStateAction<number>>;
	selectedProject: string;
}

function AddProjectLink(props: AddProjectLinkProps) {
	const privilege = props.plevel;
	const [projects, setProjects] = useState<ProjectInterface[]>([]);

	useEffect(() => {
		//Admin privilege gets to view all projects
		if (privilege == "admin") {
			serverRequest({
				method: "get",
				url: `projects`,
			}).then((response) => {
				setProjects(response.data);
				//console.log(response);
				//console.log(projects);
			});
		} else {
			//User privilege gets to view only their projects
			serverRequest({
				method: "get",
				url: `projects/${localStorage.getItem("employeeId")}`,
			}).then((response) => {
				setProjects(response.data);
				//console.log(response);
			});
		}
	}, []);

	return (
		<Col xs={props.width} className="time-slots-col add-project-link-div">
			<Dropdown>
				<Dropdown.Toggle
					id="project-dropdown"
					disabled={props.isActive}
				>
					{props.selectedProject || "Your Projects"}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{projects.map((project) => (
						<Dropdown.Item
							key={project.projectId}
							onClick={() => {
								props.setSelectedProject(project.project_name);
								props.setSelectProjectId(project.projectId);
							}}
						>
							{project.project_name}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</Col>
	);
}

export default AddProjectLink;
