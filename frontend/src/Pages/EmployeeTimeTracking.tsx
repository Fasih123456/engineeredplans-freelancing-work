import { Row, Col, Container } from "react-bootstrap";

import Header from "../Components/Header";
import Menu from "../Components/Menu";
import AddTimeSlots from "../Components/EmployeeTimeTracking/AddTimeSlots";
import WeekSummary from "../Components/EmployeeTimeTracking/WeekSummary";

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
            <AddTimeSlots />
            <WeekSummary />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EmployeeTimeTracking;
