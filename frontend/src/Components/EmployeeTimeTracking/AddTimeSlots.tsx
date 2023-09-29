//React imports
import { useState, useEffect } from "react";
import { serverRequest } from "../../GlobalFunctions";

//Component Imports
import StopWatch from "./StopWatch/StopWatch";
import ManualTimeEntry from "./StopWatch/ManualTimeEntry";

//Library imports
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

function upperAddTimeSlots(width: number) {
	return (
		<Col xs={width} className="time-slots-col">
			<input
				className="add-time-slot-heading"
				type="text"
				placeholder="What are you hustling on?"
			/>
		</Col>
	);
}

interface Projects {
	projectId: number;
	projectName: string;
}

function addProjectLink(width: number) {
	const privilege = localStorage.getItem("permissionType");
	const [projects, setProjects] = useState<Projects>([]);

	useEffect(() => {
		//Admin privilege gets to view all projects
		if (privilege === "admin") {
			serverRequest({
				method: "get",
				url: `projects`,
			}).then((response) => {
				setProjects(response.data);
				console.log(response);
			});
		} else {
			//User privilege gets to view only their projects
			serverRequest({
				method: "get",
				url: `projects/${localStorage.getItem("employeeId")}`,
			}).then((response) => {
				setProjects(response.data);
				console.log(projects);
			});
		}
	}, []);

	return (
		<Col xs={width} className="time-slots-col add-project-link-div">
			<Dropdown>
				<Dropdown.Toggle id="project-dropdown">Project</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="#project1">Project 1</Dropdown.Item>
					<Dropdown.Item href="#project2">Project 2</Dropdown.Item>
					<Dropdown.Item href="#project3">Project 3</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Col>
	);
}

function AddTimeSlots() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showStopWatch, setShowStopWatch] = useState(true);
	const [showManualTimeEntry, setShowManualTimeEntry] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(true);
	const [time, setTime] = useState(0);

	const handlePlayIconClick = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handleStopIconClick = () => {
		setIsActive(false);
		setIsPaused(true);
		setTime(0);
	};

	const addManualEntry = () => {
		setShowManualTimeEntry(true);
		setShowStopWatch(false);
	};

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

	//Display the stopwatch and all the control icons in a the same row in desktop view
	function timeSlotsDesktopView(width: number) {
		return (
			<Col xs={width} className="time-slots-col">
				<Row className="time-slots-row">
					<Col
						xs={8}
						className="time-slots-components-col centered-div"
					>
						{showStopWatch && (
							<StopWatch
								isActive={isActive}
								setIsActive={setIsActive}
								isPaused={isPaused}
								setIsPaused={setIsPaused}
								time={time}
								setTime={setTime}
							/>
						)}
						{showManualTimeEntry && <ManualTimeEntry />}
					</Col>
					<Col xs={4} className="add-time-icons-col">
						<Row className="add-time-icons">
							{showManualTimeEntry && (
								<i
									className="fa-solid fa-clock"
									onClick={handleClockIconClick}
								></i>
							)}
						</Row>

						<Row className="add-time-icons">
							{showStopWatch && !isActive && (
								<i
									className="fa-solid fa-bars"
									onClick={handleBarsIconClick}
								></i>
							)}
						</Row>

						<Row className="add-time-icons">
							{showStopWatch && !isActive && (
								<i
									className="fa-solid fa-play"
									onClick={handlePlayIconClick}
								></i>
							)}
						</Row>

						<Row className="add-time-icons">
							{showStopWatch && isActive && (
								<i
									className="fa-solid fa-stop"
									onClick={handleStopIconClick}
								></i>
							)}
						</Row>

						<Row className="add-time-icons">
							{showManualTimeEntry && (
								<i
									className="fa-solid fa-plus"
									onClick={addManualEntry}
								></i>
							)}
						</Row>
					</Col>
				</Row>
			</Col>
		);
	}

	//Display the stopwatch and all the control icons in a new row in mobile view
	function timeSlotsMobileView() {
		return (
			<>
				<Row className="lower-add-time-slots">
					<Col
						xs={8}
						className="time-slots-components-col centered-div"
					>
						{showStopWatch && (
							<StopWatch
								isActive={isActive}
								setIsActive={setIsActive}
								isPaused={isPaused}
								setIsPaused={setIsPaused}
								time={time}
								setTime={setTime}
							/>
						)}
						{showManualTimeEntry && <ManualTimeEntry />}
					</Col>
					<Col xs={4} className="add-time-icons-col">
						<div className="add-time-icons">
							{showStopWatch && !isActive && (
								<i
									className="fa-solid fa-play"
									onClick={handlePlayIconClick}
								></i>
							)}
						</div>
						<div className="add-time-icons">
							{showStopWatch && isActive && (
								<i
									className="fa-solid fa-stop"
									onClick={handleStopIconClick}
								></i>
							)}
						</div>
						<div className="add-time-icons">
							{showManualTimeEntry && (
								<i
									className="fa-solid fa-clock"
									onClick={handleClockIconClick}
								></i>
							)}
						</div>
						<div className="add-time-icons">
							{showStopWatch && !isActive && (
								<i
									className="fa-solid fa-bars"
									onClick={handleBarsIconClick}
								></i>
							)}
						</div>
						<div className="add-time-icons">
							{showManualTimeEntry && (
								<i
									className="fa-solid fa-plus"
									onClick={addManualEntry}
								></i>
							)}
						</div>
					</Col>
				</Row>
			</>
		);
	}

	return (
		<Container
			className={`${
				windowWidth > 768
					? "add-time-slots centered-div "
					: "add-time-slots"
			}`}
		>
			<Row className="upper-add-time-slots">
				{windowWidth <= 768
					? upperAddTimeSlots(8)
					: upperAddTimeSlots(4)}

				{windowWidth <= 768 ? addProjectLink(4) : addProjectLink(4)}

				{windowWidth > 768 && timeSlotsDesktopView(4)}
			</Row>
			{windowWidth <= 768 && timeSlotsMobileView()}
		</Container>
	);
}

export default AddTimeSlots;
