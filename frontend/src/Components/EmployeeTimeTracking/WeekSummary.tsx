//Component imports
import { Col, Container, Row } from "react-bootstrap";

interface WeekSummaryProps {
	Date: string;
	TotalTime: number;
}

function WeekSummary(props: WeekSummaryProps) {
	console.log(props);

	const newTime = secondsToHMS(props.TotalTime);

	function secondsToHMS(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		const pad = (num: number) => (num < 10 ? `0${num}` : num);

		return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
	}

	// TypeScript types
	type ISODateString = string;

	interface DateRange {
		start: ISODateString;
		end: ISODateString;
	}

	// Function to get the week number for a given date
	function getWeekNumber(date: Date): number {
		const d = new Date(date);
		d.setHours(0, 0, 0, 0);
		const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
		const daysToThursday = 3 - ((d.getDay() + 6) % 7); // Days until Thursday (0-based)

		const week1 = new Date(d.getFullYear(), 0, 4);
		week1.setHours(0, 0, 0, 0);

		const daysBetween =
			(d.getTime() - week1.getTime()) / millisecondsPerDay;
		const weekNumber = Math.ceil((daysBetween + daysToThursday) / 7);

		return weekNumber;
	}

	// Function to get the start of the week for a given date
	function getStartOfWeek(date: Date): Date {
		const d = new Date(date);
		const dayOfWeek = d.getDay();
		const diff = d.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when the day is Sunday
		d.setDate(diff);
		d.setHours(0, 0, 0, 0);
		return d;
	}

	// Function to get the end of the week for a given date
	function getEndOfWeek(date: Date): Date {
		const startOfWeek = getStartOfWeek(date);
		const endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);
		endOfWeek.setHours(23, 59, 59, 999);
		return endOfWeek;
	}

	function dateToWeekLabel(inputDate: ISODateString): string {
		const currentDate = new Date();
		const inputDateObj = new Date(inputDate);

		// Function to format a number as "1st", "2nd", "3rd", etc.
		const formatDay = (day: number): string => {
			switch (day % 10) {
				case 1:
					return `${day}st`;
				case 2:
					return `${day}nd`;
				case 3:
					return `${day}rd`;
				default:
					return `${day}th`;
			}
		};

		const inputDay = formatDay(inputDateObj.getDate());
		const inputMonth = inputDateObj.toLocaleString("default", {
			month: "short",
		});

		if (inputDateObj.getFullYear() === currentDate.getFullYear()) {
			if (inputDateObj.getMonth() === currentDate.getMonth()) {
				const dayDifference =
					currentDate.getDate() - inputDateObj.getDate();
				if (dayDifference === 0) {
					return "Today";
				} else if (dayDifference === 1) {
					return "Yesterday";
				}
			}
		}

		const startOfWeek = getStartOfWeek(inputDateObj);
		const endOfWeek = getEndOfWeek(inputDateObj);

		const startOfWeekLabel = `${inputMonth} ${startOfWeek.getDate()}`;
		const endOfWeekLabel = `${inputMonth} ${endOfWeek.getDate()}`;

		return `${startOfWeekLabel} - ${endOfWeekLabel}`;
	}

	return (
		<>
			<Container className="week-summary">
				<Row className="week-summary-row">
					<Col className="week-summary-container">
						<h1 className="week-summary-heading">
							{dateToWeekLabel(props.Date)}
						</h1>
					</Col>
					<Col className="week-summary-container week-summary-text-container">
						<p className="week-summary-text">Week Total: </p>
						<span className="time-display">{newTime}</span>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default WeekSummary;
