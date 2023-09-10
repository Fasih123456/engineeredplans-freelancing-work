import { Col, Container, Row } from "react-bootstrap";

function WeekSummary() {
	return (
		<>
			<Container className="week-summary">
				<Row>
					<h1 className="week-summary-heading">This Week</h1>
				</Row>
				<Row>
					<Col>
						<p className="week-summary-text">Week Total: </p>
						<span className="time-display">00:00:00</span>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default WeekSummary;
