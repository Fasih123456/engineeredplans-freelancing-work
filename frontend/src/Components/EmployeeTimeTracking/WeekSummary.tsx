import { Col, Container, Row } from "react-bootstrap";

function WeekSummary() {
	return (
		<>
			<Container className="week-summary">
				<Row className="week-summary-row">
					<Col className="week-summary-container">
						<h1 className="week-summary-heading">This Week</h1>
					</Col>
					<Col className="week-summary-container week-summary-text-container">
						<p className="week-summary-text">Week Total: </p>
						<span className="time-display">00:00:00</span>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default WeekSummary;
