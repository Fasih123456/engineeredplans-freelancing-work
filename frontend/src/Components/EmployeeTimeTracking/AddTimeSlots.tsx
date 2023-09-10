import { Col, Container, Row } from "react-bootstrap";

function AddTimeSlots() {
  return (
    <Container className="add-time-slots">
      <Row className="upper-add-time-slots">
        <Col xs={10} className="time-slots-col">
          <h1>What are you hustling on?</h1>
        </Col>
        <Col xs={2} className="time-slots-col add-project-link-div">
          <a className="add-project-link">
            <i className="fa-solid fa-plus fa-icon"></i>Project
          </a>
        </Col>
      </Row>
      <Row className="lower-add-time-slots">
        <Col xs={10}></Col>
        <Col>
          <span className="current-hours-worked">00:00:00</span>
          <button className="add-time-slots-start-button">Start</button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTimeSlots;
