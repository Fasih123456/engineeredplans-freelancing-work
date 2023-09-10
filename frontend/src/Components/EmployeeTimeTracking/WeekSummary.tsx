import { Col, Container, Row } from "react-bootstrap";

function WeekSummary() {
  return (
    <>
      <Container className="week-summary">
        <Row>
          <h1>This Week</h1>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              Week Total: <span>00:00:00</span>
            </p>
          </Col>
          <Col xs={10}></Col>
        </Row>
      </Container>
    </>
  );
}

export default WeekSummary;
