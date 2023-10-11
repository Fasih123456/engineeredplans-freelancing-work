//Component Imports
import ProjectDisplay from "../../Components/Projects/ProjectDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
//Library imports
import { Row, Col, Container } from "react-bootstrap";

//This component is the main page for the Project Management page, it renders the project display component. This page is for admin view and displays all projects
function ProjectManagement() {
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
							<ProjectDisplay />
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default ProjectManagement;
