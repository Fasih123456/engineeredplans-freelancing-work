//Component imports
import EachInstance from "./EachInstance";
//React imports
import { useState } from "react";

//Library imports
import { Col, Container, Row } from "react-bootstrap";

interface AllInstanceSummaryProps {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

function InstanceCard(props: { task: AllInstanceSummaryProps[] }) {
	const [showEachInstance, setShowEachInstance] = useState(false);

	//console.log(props);

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
						{props.task.length}
					</span>
					<p className="summary-task-name">
						{props.task[0].projectId}
					</p>
				</Col>
				<Col xs={3} className="summa ry-task-container-body-col2">
					<p className="summary-task-duration time-display">
						{formatTime(props.task[0].time)}
					</p>
				</Col>
			</Row>
			{showEachInstance && <EachInstance task={props.task} />}
		</>
	);
}

interface WeekSummaryInstancesProps {
	tasks: AllInstanceSummaryProps[]; // Assuming you have the AllInstanceSummaryProps type defined
}

interface Task {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

interface Props {
	tasks: Task[];
}

//This component renders each instance of tasks for the week
function WeekSummaryInstances(props: WeekSummaryInstancesProps) {
	const { tasks } = props;
	const filteredTasks: Record<string, Task[]> = {};

	for (const item of props.tasks) {
		const projectId = item.projectId;

		// If an array is not present for this projectId, create one
		if (!filteredTasks[projectId]) {
			filteredTasks[projectId] = [];
		}

		filteredTasks[projectId].push(item);
	}

	const result = Object.values(filteredTasks);

	//console.log(result);

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

	let taskList: AllInstanceSummaryProps[] = [];
	let instanceCards: JSX.Element[] = [];

	for (let i = 0; i < result.length; i++) {
		const task = result[i];
		//console.log(task);
		//console.log(task.length);
		instanceCards.push(<InstanceCard key={task[0].taskId} task={task} />);
	}

	return (
		<>
			<div style={{ maxHeight: "70vh", overflowY: "auto" }}>
				<Container className="all-instance-summary">
					{/* Main Body for each instance to be rendered */}
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
							{instanceCards}
						</div>
					))}
				</Container>
			</div>
		</>
	);
}

export default WeekSummaryInstances;
