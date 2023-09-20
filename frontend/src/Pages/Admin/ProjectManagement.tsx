import Header from "../../Components/Header";
import Menu from "../../Components/Menu";

import { Row, Col, Container, Table } from "react-bootstrap";
import ProjectDisplay from "../../Components/ProjectDisplay";

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
