//React imports
import { useState, useEffect } from "react";
import { serverRequest } from "../../GlobalFunctions";

//Component Imports
import StopWatch from "./StopWatch/StopWatch";
import ManualTimeEntry from "./StopWatch/ManualTimeEntry";
import AddProjectLink from "./SubComponents/AddProjectLink";

//Library imports
import { Col, Container, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

//This function displays the text area for the user to enter the task they are working on, extracted so we can have dynamic width

interface AddTimeSlotsProps {
	plevel: string;
}

function AddTimeSlots(props: AddTimeSlotsProps) {
	//Status States
	const [isActive, setIsActive] = useState(false);
	const [isPaused, setIsPaused] = useState(true);

	//Information States
	const [task, setTask] = useState("");
	const [selectedProject, setSelectedProject] = useState("");
	const [selectProjectId, setSelectProjectId] = useState(0);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [showStopWatch, setShowStopWatch] = useState(true);
	const [showManualTimeEntry, setShowManualTimeEntry] = useState(false);

	//Time States
	const [time, setTime] = useState(0);
	const [date, setDate] = useState("");

	//console.log(time, date);

	//This function deals with just the input field where the task name is entered
	function upperAddTimeSlots(width: number) {
		return (
			<Col xs={width} className="time-slots-col">
				{isActive ? (
					<input
						className="add-time-slot-heading"
						type="text"
						placeholder="What are you hustling on?"
						onChange={(e) => setTask(e.target.value)}
						disabled
					/>
				) : (
					<input
						className="add-time-slot-heading"
						type="text"
						placeholder="What are you hustling on?"
						onChange={(e) => setTask(e.target.value)}
					/>
				)}
			</Col>
		);
	}

	//This function handles the function of each icon
	const handleIconClick = (type: string) => {
		switch (type) {
			case "play":
				if (handlePlay() == -1) {
					break;
				}
				setIsActive(true);
				setIsPaused(false);
				break;
			case "stop":
				handleStop();
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
			case "plus":
				handleManualTimeEntry();
				break;
			default:
				break;
		}
	};

	//Will be called when the user clicks the play button, will return -1 on error
	function handlePlay() {
		if (selectedProject == "") {
			toast.warning("Please select a Project");
			return -1;
		} else if (task == "") {
			toast.warning("Please enter a Task");
			return -1;
		}

		toast.success("Timer started");
		return 1;
	}

	function saveTask() {
		const timeSpent = time;

		const today = new Date();
		const formattedDate = today.toISOString().slice(0, 10);

		serverRequest({
			method: "post",
			url: `tasks`,
			data: {
				employeeId: localStorage.getItem("employeeId"),
				projectId: selectProjectId,
				time: Math.floor(timeSpent / 1000),
				date: date == "" ? formattedDate : date,
			},
		}).then((response) => {
			if (response.status == 201) {
				toast.success("Time Entry added!");
			} else if (response.status == 500) {
				toast.error("Server Error has occurred, contact admin");
			}
		});
	}

	//This function will store all the task information on the database
	function handleStop() {
		saveTask();
	}

	//This function will handle the manual time entry including adding the time to the database
	function handleManualTimeEntry() {
		let status = handlePlay(); //making sure all fields are selected

		if (status == -1) {
			return;
		}

		saveTask();
	}
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

	//This useEffect is used to get the current window width based on which the component will be rendered differently
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
						{showManualTimeEntry && (
							<ManualTimeEntry
								setDate={setDate}
								setTime={setTime}
								time={time}
								date={date}
							/>
						)}
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
						{showManualTimeEntry && (
							<ManualTimeEntry
								setDate={setDate}
								setTime={setTime}
								time={time}
								date={date}
							/>
						)}
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

				{windowWidth <= 768 ? (
					<AddProjectLink
						width={3}
						plevel={props.plevel}
						isActive={isActive}
						setSelectProjectId={setSelectProjectId}
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
					/>
				) : (
					<AddProjectLink
						width={3}
						plevel={props.plevel}
						isActive={isActive}
						setSelectProjectId={setSelectProjectId}
						setSelectedProject={setSelectedProject}
						selectedProject={selectedProject}
					/>
				)}

				{windowWidth > 768 && timeSlotsDesktopView(5)}
			</Row>
			{windowWidth <= 768 && timeSlotsMobileView()}
		</Container>
	);
}

export default AddTimeSlots;
