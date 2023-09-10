import { Col, Container, Row } from "react-bootstrap";

function AllInstanceSummary() {
	return (
		<Container className="all-instance-summary">
			<Row>
				<Col xs={10}>Mon, Sep 4</Col>
				<Col xs={2}>00:00:00</Col>
			</Row>
		</Container>
	);
}

export default AllInstanceSummary;
