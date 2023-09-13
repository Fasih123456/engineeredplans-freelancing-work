//Bootstrap imports
import { Row, Col, Container } from "react-bootstrap";

//Component Imports
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import AddTimeSlots from "../Components/EmployeeTimeTracking/AddTimeSlots";
import AllInstanceSummary from "../Components/EmployeeTimeTracking/AllInstanceSummary";

function EmployeeTimeTracking() {
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
							<AddTimeSlots />
							<AllInstanceSummary />
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EmployeeTimeTracking;
