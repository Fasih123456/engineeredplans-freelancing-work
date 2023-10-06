//Component imports
import EachInstance from "./EachInstance";
//React imports
import { useState, useEffect } from "react";

//Library imports
import { Col, Container, Row } from "react-bootstrap";
import { serverRequest } from "../../GlobalFunctions";

interface AllInstanceSummaryProps {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

function InstanceCard(props: { task: AllInstanceSummaryProps }) {
	const [showEachInstance, setShowEachInstance] = useState(false);

	const handleCurrentInstancesClick = () => {
		setShowEachInstance(!showEachInstance);
	};

	function formatTime(timeInSeconds: number) {
		const hours = Math.floor(timeInSeconds / 3600);
		const minutes = Math.floor((timeInSeconds % 3600) / 60);
		const seconds = timeInSeconds % 60;

		//Padstart adds two leading zeros as padding, their will always be two digits for minutes and seconds
		return `${hours.toString().padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}

	return (
		<>
			<Row className="summary-task-container-body">
				<Col xs={9} className="summary-task-container-body-col1">
					<span
						className="current-instances"
						onClick={handleCurrentInstancesClick}
					>
						2
					</span>
					<p className="summary-task-name">{props.task.projectId}</p>
				</Col>
				<Col xs={3} className="summa ry-task-container-body-col2">
					<p className="summary-task-duration time-display">
						{formatTime(props.task.time)}
					</p>
				</Col>
			</Row>
			{showEachInstance && <EachInstance />}
		</>
	);
}

interface WeekSummaryInstancesProps {
	tasks: AllInstanceSummaryProps[]; // Assuming you have the AllInstanceSummaryProps type defined
}

//This component renders each instance of tasks for the week
function WeekSummaryInstances(props: WeekSummaryInstancesProps) {
	const { tasks } = props;

	// Group tasks by date
	const tasksByDate: Record<string, AllInstanceSummaryProps[]> = {};

	tasks.forEach((task) => {
		const date = new Date(task.date).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});

		if (!tasksByDate[date]) {
			tasksByDate[date] = [];
		}

		tasksByDate[date].push(task);
	});

	// Function to calculate the total time spent for a set of tasks
	const calculateTotalTime = (
		taskList: AllInstanceSummaryProps[]
	): number => {
		return taskList.reduce((total, task) => total + (task.time || 0), 0);
	};

	//console.log(tasksByDate);

	return (
		<>
			<div style={{ maxHeight: "70vh", overflowY: "auto" }}>
				{/* You can adjust the maxHeight value to your preference */}
				<Container className="all-instance-summary">
					{Object.entries(tasksByDate).map(([date, taskList]) => (
						<div key={date}>
							<Row className="summary-task-container-heading">
								<Col xs={9}>{date}</Col>
								<Col
									xs={3}
									className="day-time-spent-container"
								>
									<p className="time-display day-time-spent">
										{new Date(
											calculateTotalTime(taskList) * 1000
										)
											.toISOString()
											.substr(11, 8)}
									</p>
								</Col>
							</Row>
							{/* Render task details for this date */}
							{taskList.map((task) => (
								<InstanceCard key={task.taskId} task={task} />
							))}
						</div>
					))}
				</Container>
			</div>
		</>
	);
}

export default WeekSummaryInstances;
