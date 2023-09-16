//Bootstrap Imports
import { Row, Col, Container, Table } from "react-bootstrap";

//Component Imports
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import ProjectDisplay from "../Components/ProjectDisplay";

function Projects() {
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
