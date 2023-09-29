//React imports
import { useState, useEffect } from "react";
import { serverRequest } from "../../GlobalFunctions";

//Component Imports
import StopWatch from "./StopWatch/StopWatch";
import ManualTimeEntry from "./StopWatch/ManualTimeEntry";

//Library imports
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

//This function displays the text area for the user to enter the task they are working on, extracted so we can have dynamic width
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

//This function handles the projects displayed in the dropdown
function addProjectLink(width: number, plevel: string) {
	const privilege = plevel;
	const [projects, setProjects] = useState<Projects>([]);
	const [selectedProject, setSelectedProject] = useState("");

	useEffect(() => {
		console.log(privilege);
		//Admin privilege gets to view all projects
		if (privilege == "admin") {
			serverRequest({
				method: "get",
				url: `projects`,
			}).then((response) => {
				setProjects(response.data);
				//console.log(response);
				//console.log(projects);
			});
		} else {
			//User privilege gets to view only their projects
			serverRequest({
				method: "get",
				url: `projects/${localStorage.getItem("employeeId")}`,
			}).then((response) => {
				setProjects(response.data);
				//console.log(response.data);
			});
		}
	}, []);

	return (
		<Col xs={width} className="time-slots-col add-project-link-div">
			<Dropdown>
				<Dropdown.Toggle id="project-dropdown">
					{selectedProject || "Your Projects"}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{projects.map((project) => (
						<Dropdown.Item
							key={project.projectId}
							onClick={() =>
								setSelectedProject(project.project_name)
							}
						>
							{project.project_name}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</Col>
	);
}

interface AddTimeSlotsProps {
	plevel: string;
}

function AddTimeSlots(props: AddTimeSlotsProps) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showStopWatch, setShowStopWatch] = useState(true);
	const [showManualTimeEntry, setShowManualTimeEntry] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(true);
	const [time, setTime] = useState(0);

	//This function handles the function of each icon
	const handleIconClick = (type: string) => {
		switch (type) {
			case "play":
				setIsActive(true);
				setIsPaused(false);
				break;
			case "stop":
				setIsActive(false);
				setIsPaused(true);
				setTime(0);
				break;
			case "clock":
				setShowStopWatch(true);
				setShowManualTimeEntry(false);
				break;
			case "bars":
				setShowManualTimeEntry(true);
				setShowStopWatch(false);
				break;
			default:
				break;
		}
	};

	//This function handles the display of the icons
	function handleIconDisplay() {
		return (
			<>
				<Row className="add-time-icons">
					{showManualTimeEntry && (
						<i
							className="fa-solid fa-clock"
							onClick={handleIconClick.bind(null, "clock")}
						></i>
					)}
				</Row>

				<Row className="add-time-icons">
					{showStopWatch && !isActive && (
						<i
							className="fa-solid fa-bars"
							onClick={handleIconClick.bind(null, "bars")}
						></i>
					)}
				</Row>

				<Row className="add-time-icons">
					{showStopWatch && !isActive && (
						<i
							className="fa-solid fa-play"
							onClick={handleIconClick.bind(null, "play")}
						></i>
					)}
				</Row>

				<Row className="add-time-icons">
					{showStopWatch && isActive && (
						<i
							className="fa-solid fa-stop"
							onClick={handleIconClick.bind(null, "stop")}
						></i>
					)}
				</Row>

				<Row className="add-time-icons">
					{showManualTimeEntry && (
						<i
							className="fa-solid fa-plus"
							onClick={handleIconClick.bind(null, "plus")}
						></i>
					)}
				</Row>
			</>
		);
	}

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
						{handleIconDisplay()}
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
						{handleIconDisplay()}
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

				{windowWidth <= 768
					? addProjectLink(3, props.plevel)
					: addProjectLink(3, props.plevel)}

				{windowWidth > 768 && timeSlotsDesktopView(5)}
			</Row>
			{windowWidth <= 768 && timeSlotsMobileView()}
		</Container>
	);
}

export default AddTimeSlots;
