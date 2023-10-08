//Component Imports
import WeekSummary from "./WeekSummary";
import WeekSummaryInstances from "./WeekSummaryInstances";
import { serverRequest } from "../../GlobalFunctions";

//React imports
import { useEffect, useState } from "react";

//Interface
import { TaskInterface } from "../../GlobalInterface";

function AllInstanceSummary() {
	const [allTasks, setAllTasks] = useState<TaskInterface[]>([]);

	useEffect(() => {
		const employeeId = localStorage.getItem("employeeId");
		console.log(employeeId);
		serverRequest({
			method: "get",
			url: `tasks/${employeeId}`,
		})
			.then((response) => {
				console.log(response.data);

				const tasks = response.data.map((task: TaskInterface) => ({
					taskId: task.taskId,
					employeeId: task.employeeId,
					projectId: task.projectId,
					date: task.date,
					time: task.time,
				}));

				setAllTasks(tasks);

				console.log(allTasks);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	// Function to group tasks by week
	const groupTasksByWeek = () => {
		const groupedTasks: Record<string, TaskInterface[]> = {};

		allTasks.forEach((task) => {
			const taskDate = new Date(task.date);
			const weekStartDate = getStartOfWeek(taskDate);

			if (!groupedTasks[weekStartDate]) {
				groupedTasks[weekStartDate] = [];
			}

			groupedTasks[weekStartDate].push(task);
		});

		return groupedTasks;
	};

	// Function to get the start date of the week for a given date
	const getStartOfWeek = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate() - date.getDay(); // Start of the week (Sunday as the first day)
		const weekStartDate = new Date(year, month, day);

		return weekStartDate.toISOString();
	};

	// Calculate week totals for each week and generate WeekSummary components
	const weekSummaries = Object.entries(groupTasksByWeek()).map(
		([weekStartDate, tasks]) => {
			const weekTotal = tasks.reduce(
				(total, task) => total + task.time,
				0
			);

			return (
				<div key={weekStartDate} style={{ overflow: "auto" }}>
					<WeekSummary Date={weekStartDate} TotalTime={weekTotal} />
					<WeekSummaryInstances tasks={tasks} />
				</div>
			);
		}
	);

	return <>{weekSummaries}</>;
}
export default AllInstanceSummary;
