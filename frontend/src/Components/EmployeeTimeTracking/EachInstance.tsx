//Component Imports
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { serverRequest } from "../../GlobalFunctions";
import { useState } from "react";

interface AllInstanceSummaryProps {
	taskId: string;
	employeeId: string;
	projectId: string;
	date: string;
	time: number;
}

function EachInstace2(props: { task: AllInstanceSummaryProps }) {
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

//This Component renders the tasks which have been grouped together by the same date and projectId.
function EachInstance(props: { task: AllInstanceSummaryProps[] }) {
	const [taskNames, setTaskNames] = useState<string[]>([]);

	console.log(props.task);
	const eachInstance: JSX.Element[] = [];

	for (let i = 0; i < props.task.length; i++) {
		const task = props.task[i];
		console.log(task);

		eachInstance.push(<EachInstace2 task={task} />);
	}

	return <>{eachInstance}</>;
}

export default EachInstance;
