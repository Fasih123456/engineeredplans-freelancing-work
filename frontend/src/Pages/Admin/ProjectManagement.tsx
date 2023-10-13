//Component Imports
import ProjectDisplay from "../../Components/Projects/ProjectDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
import { serverRequest } from "../../GlobalFunctions";

//Library imports
import { Row, Col, Container, Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

import CreateProjectModal from "../../Components/Projects/CreateProjectModal";

import { EmployeeInterface } from "../../GlobalInterface";

//This component is the main page for the Project Management page, it renders the project display component. This page is for admin view and displays all projects
function ProjectManagement() {
	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const [employees, setEmployees] = useState<EmployeeInterface[]>([]);

	useEffect(() => {
		serverRequest({
			method: "get",
			url: "employees",
		})
			.then((response) => {
				setEmployees(
					response.data.map((employee: EmployeeInterface) => ({
						employeeId: employee.employeeId,
						name: employee.name,
					}))
				);
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCreateProject = async (projectData: {
		name: string;
		employeeIds: string[];
	}) => {
		try {
			await serverRequest({
				method: "post",
				url: "projects",
				data: projectData,
			}).then((response) => {
				console.log(response.status);
				if (response.status === 200) {
					toast.success(`Project ${projectData.name} created!`);
				}
			});
		} catch (error) {
			toast.error("An error has occurred");
			console.error(error);
		}
	};

	return (
		<>
			<Header />

			<Container className="outer-wrapper" fluid>
				<Row>
					<Col xs={2} className="menu-col">
						<Menu />
					</Col>
					<Col xs={10}>
						<Container className="wrapper">
							<Row>
								<Button
									style={{
										width: "25%",
									}}
									onClick={() =>
										setShowCreateProjectModal(true)
									}
								>
									Create Project
								</Button>
							</Row>
							<Row style={{ paddingTop: "20px" }}>
								<h2 className="projects-title">
									Your Assigned Projects
								</h2>
							</Row>
							<Row>
								<ProjectDisplay />
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
			<CreateProjectModal
				show={showCreateProjectModal}
				onHide={() => setShowCreateProjectModal(false)}
				onCreateProject={handleCreateProject}
				employees={employees}
			/>
		</>
	);
}

export default ProjectManagement;
