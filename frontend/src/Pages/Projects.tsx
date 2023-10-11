//Bootstrap Imports
import { Row, Col, Container } from "react-bootstrap";

//Component Imports
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import ProjectDisplay from "../Components/Projects/ProjectDisplay";

//This component is the main page for the Projects page, it renders the project display component. This page is for user view and only displays user specific projects
function Projects() {
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
							<h2 className="projects-title">
								Your Assigned Projects
							</h2>
							<Row>
								<ProjectDisplay />
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Projects;
