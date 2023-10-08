//Component Imports
import { Col, Row } from "react-bootstrap";

interface AllInstanceSummaryProps {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

function EachInstance(props: { task: AllInstanceSummaryProps }) {
	return (
		<>
			<Row className="summary-task-container-body">
				<Col
					xs={9}
					className="summary-task-container-body-col1 each-instance"
				>
					<p className="summary-task-name">{props.task.taskId}</p>
				</Col>
				<Col
					xs={3}
					className="summary-task-container-body-col2 each-instance"
				>
					<p className="summary-task-duration time-display">
						{props.task.time}
					</p>
				</Col>
			</Row>
		</>
	);
}

//This Component takes an array of tasks grouped by projectId and feeds them to EachInstance to render each instance
function RenderEachInstance(props: { task: AllInstanceSummaryProps[] }) {
	//console.log(props.task);
	const eachInstance: JSX.Element[] = [];

	for (let i = 0; i < props.task.length; i++) {
		const task = props.task[i];
		//console.log(task);

		eachInstance.push(<EachInstance task={task} />);
	}

	return <>{eachInstance}</>;
}

export default RenderEachInstance;
