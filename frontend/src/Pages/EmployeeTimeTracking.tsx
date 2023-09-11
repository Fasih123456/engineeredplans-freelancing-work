import { Row, Col, Container } from "react-bootstrap";

import axios from "axios";

import Header from "../Components/Header";
import Menu from "../Components/Menu";
import AddTimeSlots from "../Components/EmployeeTimeTracking/AddTimeSlots";
import WeekSummary from "../Components/EmployeeTimeTracking/WeekSummary";
import AllInstanceSummary from "../Components/EmployeeTimeTracking/AllInstanceSummary";

function EmployeeTimeTracking() {
	async function postName() {
		try {
			axios.post("http://localhost:3001/post_name", {
				name: "test",
			});
		} catch (err) {
			console.log(err);
		}
	}

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
							<WeekSummary />
							<AllInstanceSummary />
							<button onClick={postName}>test</button>
						</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EmployeeTimeTracking;
