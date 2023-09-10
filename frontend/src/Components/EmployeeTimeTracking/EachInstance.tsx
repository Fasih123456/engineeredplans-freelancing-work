import { Col, Container, Row } from "react-bootstrap";

function EachInstance() {
	return (
		<>
			<Container className="all-instance-summary each-instance-body ">
				<Row className="summary-task-container-body">
					<Col
						xs={9}
						className="summary-task-container-body-col1 each-instance"
					>
						<p className="summary-task-name">Task 1</p>
					</Col>
					<Col
						xs={3}
						className="summary-task-container-body-col2 each-instance"
					>
						<p className="summary-task-duration time-display">
							00:00:00
						</p>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default EachInstance;
