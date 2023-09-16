import EmployeeDisplay from "../../Components/EmployeeDisplay";
import Header from "../../Components/Header";
import Menu from "../../Components/Menu";

import { Row, Col, Container, Table } from "react-bootstrap";

function EmployeeManagement() {
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
							<Row>
								<Col>
									<button>Create Employee</button>
								</Col>
							</Row>
							<Row>
								<EmployeeDisplay />
							</Row>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EmployeeManagement;
