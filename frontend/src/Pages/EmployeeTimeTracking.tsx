//Bootstrap imports
import { Row, Col, Container } from "react-bootstrap";

//Component Imports
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import AddTimeSlots from "../Components/EmployeeTimeTracking/AddTimeSlots";
import AllInstanceSummary from "../Components/EmployeeTimeTracking/AllInstanceSummary";

interface EmployeeTimeTrackingProps {
	plevel: string;
}

//This component is the main page for the Employee Time Tracking page, it renders both the time adding component and the task displaying component
function EmployeeTimeTracking(props: EmployeeTimeTrackingProps) {
	return (
		<>
			<Header />
			<Container className="outer-wrapper" fluid>
				<Row>
					<Col sm={0} md={2} className="menu-col">
						<Menu />
					</Col>
					<Col sm={12} md={10}>
						<Container className="wrapper">
							<AddTimeSlots plevel={props.plevel} />
							<AllInstanceSummary />
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EmployeeTimeTracking;
