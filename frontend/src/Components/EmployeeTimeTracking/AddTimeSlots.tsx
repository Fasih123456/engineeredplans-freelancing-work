import { Col, Container, Row, Dropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AddTimeSlots() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [startDate, setStartDate] = useState(new Date());

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
				<Col xs={9} className="time-slots-col">
					<h1 className="add-time-slot-heading">
						What are you hustling on?
					</h1>
				</Col>
				<Col xs={3} className="time-slots-col add-project-link-div">
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
			</Row>
			<Row className="lower-add-time-slots">
				<Col xs={6} className="add-time-start-section">
					<Row>
						<Col>Start Time</Col>
						<Col>End Time</Col>
						<Col>
							<button>Submit Entry</button>
						</Col>
					</Row>
					<Row>
						<Col xs={4}>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								showTimeSelect
							/>
						</Col>
						<Col xs={4}>
							<DatePicker
								selected={startDate}
								onChange={(date) => setStartDate(date)}
								showTimeSelect
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={6} className="add-time-start-section">
					<StopWatch />
				</Col>
			</Row>
		</Container>
	);
}

export default AddTimeSlots;
