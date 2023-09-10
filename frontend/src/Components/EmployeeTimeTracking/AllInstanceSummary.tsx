import { Col, Container, Row } from "react-bootstrap";
import EachInstance from "./EachInstance";

import React, { useState } from "react";

function AllInstanceSummary() {
	const [showEachInstance, setShowEachInstance] = useState(false);

	const handleCurrentInstancesClick = () => {
		setShowEachInstance(!showEachInstance);
	};

	return (
		<>
			<Container className="all-instance-summary">
				<Row className="summary-task-container-heading">
					<Col xs={9}>Mon, Sep 4</Col>
					<Col xs={3} className="day-time-spent-container">
						<p className="time-display day-time-spent">00:00:00</p>
					</Col>
				</Row>
				<Row className="summary-task-container-body">
					<Col xs={9} className="summary-task-container-body-col1">
						<span
							className="current-instances"
							onClick={handleCurrentInstancesClick}
						>
							2
						</span>
						<p className="summary-task-name">Task 1</p>
					</Col>
					<Col xs={3} className="summary-task-container-body-col2">
						<p className="summary-task-duration time-display">
							00:00:00
						</p>
					</Col>
				</Row>
			</Container>
			{showEachInstance && <EachInstance />}
		</>
	);
}
export default AllInstanceSummary;
