//Component Imports
import ProjectDisplay from "../../Components/ProjectDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";
//Library imports
import { Row, Col, Container } from "react-bootstrap";

function ProjectManagement() {
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
							<ProjectDisplay />
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default ProjectManagement;
