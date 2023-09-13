import { Col, Container, Row, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";

import "react-datepicker/dist/react-datepicker.css";
import ManualTimeEntry from "./ManualTimeEntry";

function AddTimeSlots() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showStopWatch, setShowStopWatch] = useState(true);
	const [showManualTimeEntry, setShowManualTimeEntry] = useState(false);

	const handleClockIconClick = () => {
		setShowStopWatch(!showStopWatch);
		setShowManualTimeEntry(false);
	};

	const handleBarsIconClick = () => {
		setShowManualTimeEntry(!showManualTimeEntry);
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
				<Col xs={4} className="time-slots-col add-project-link-div">
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
				<Col xs={4} className="time-slots-col">
					<Row>
						<Col xs={11} className="time-slots-components-col">
							{showStopWatch && <StopWatch />}
							{showManualTimeEntry && <ManualTimeEntry />}
						</Col>
						<Col xs={1}>
							<i
								className="fa-solid fa-clock"
								onClick={handleClockIconClick}
							></i>
							<i
								className="fa-solid fa-bars"
								onClick={handleBarsIconClick}
							></i>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default AddTimeSlots;
