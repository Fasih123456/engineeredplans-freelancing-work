import { Col, Container, Row, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch/StopWatch";

import "react-datepicker/dist/react-datepicker.css";
import ManualTimeEntry from "./StopWatch/ManualTimeEntry";

function AddTimeSlots() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showStopWatch, setShowStopWatch] = useState(true);
	const [showManualTimeEntry, setShowManualTimeEntry] = useState(false);

	const handleClockIconClick = () => {
		setShowStopWatch(true);
		setShowManualTimeEntry(false);
	};

	const handleBarsIconClick = () => {
		setShowManualTimeEntry(true);
		setShowStopWatch(false);
	};

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<Container className="add-time-slots">
			<Row className="upper-add-time-slots">
				<Col xs={4} className="time-slots-col">
					<input
						className="add-time-slot-heading"
						type="text"
						placeholder="What are you hustling on?"
					/>
				</Col>
				<Col xs={2} className="time-slots-col add-project-link-div">
					<Dropdown>
						<Dropdown.Toggle id="project-dropdown">
							Project
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href="#project1">
								Project 1
							</Dropdown.Item>
							<Dropdown.Item href="#project2">
								Project 2
							</Dropdown.Item>
							<Dropdown.Item href="#project3">
								Project 3
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col xs={6} className="time-slots-col">
					<Row className="time-slots-row">
						<Col xs={11} className="time-slots-components-col">
							{showStopWatch && <StopWatch />}
							{showManualTimeEntry && <ManualTimeEntry />}
						</Col>
						<Col xs={1} className="add-time-icons-col">
							<Row className="add-time-icons">
								<i
									className="fa-solid fa-clock"
									onClick={handleClockIconClick}
								></i>
							</Row>
							<Row className="add-time-icons">
								<i
									className="fa-solid fa-bars"
									onClick={handleBarsIconClick}
								></i>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default AddTimeSlots;
