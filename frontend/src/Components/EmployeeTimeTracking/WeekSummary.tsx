//Component imports
import { Col, Container, Row } from "react-bootstrap";

import { formatTime } from "../../GlobalFunctions";

interface WeekSummaryProps {
	Date: string;
	TotalTime: number;
}

function WeekSummary(props: WeekSummaryProps) {
	//console.log(props);

	const newTime = formatTime(props.TotalTime);

	// TypeScript types
	type ISODateString = string;

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

	/*Converts the date from HH:MM:SSZZZ to MMM DD - MMM DD*/
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
