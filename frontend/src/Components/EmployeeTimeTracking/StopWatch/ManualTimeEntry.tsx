//react imports
import { useState } from "react";

//Library imports
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

interface ManualTimeEntryProps {
	time: number;
	date: string;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	setDate: React.Dispatch<React.SetStateAction<string>>;
}

const determineMonth = (month: string) => {
	switch (month) {
		case "Jan":
			return 1;
		case "Feb":
			return 2;
		case "Mar":
			return 3;
		case "Apr":
			return 4;
		case "May":
			return 5;
		case "Jun":
			return 6;
		case "Jul":
			return 7;
		case "Aug":
			return 8;
		case "Sep":
			return 9;
		case "Oct":
			return 10;
		case "Nov":
			return 11;
		case "Dec":
			return 12;
		default:
			return 0;
	}
};

//TODO: Make the manual time entry show the time as well
//TODO: The CSS for this is broken
function ManualTimeEntry(props: ManualTimeEntryProps) {
	const [startTime, setStartTime] = useState();
	const [endTime, setEndTime] = useState();
	const [selectedDate, setSelectedDate] = useState("");
	const [startDate, setStartDate] = useState("");

	//Time is in 24 hour format
	const handleStartTimeChange = (time: any | null) => {
		setStartTime(time);

		let timeTokens = time.toString().split(" ");
		let startTimeSeconds = getSeconds(timeTokens[4]);
		let timeDifference = 0;

		if (endTime.toString().length != 0) {
			let endTimeTokens = endTime.toString().split(" ");
			let endTimeSeconds = getSeconds(endTimeTokens[4]);

			timeDifference = endTimeSeconds - startTimeSeconds;
		}

		props.setTime(timeDifference);
	};

	const handleEndTimeChange = (time: any | null) => {
		setEndTime(time);

		let timeTokens = time.toString().split(" ");

		let endTimeSeconds = getSeconds(timeTokens[4]);
		let timeDifference = 0;

		if (startTime.toString().length != 0) {
			let startTimeTokens = startTime.toString().split(" ");
			let startTimeSeconds = getSeconds(startTimeTokens[4]);

			timeDifference = endTimeSeconds - startTimeSeconds;
		}

		props.setTime(timeDifference);
	};

	const getSeconds = (time: string) => {
		let timeTokens = time.toString().split(":");

		let hours = parseInt(timeTokens[0]);
		let minutes = parseInt(timeTokens[1]);
		let seconds = parseInt(timeTokens[2]);

		let totalSeconds = hours * 3600 + minutes * 60 + seconds;

		return totalSeconds;
	};

	const handleSelectedDateChange = (date: Date | null) => {
		setSelectedDate(date);

		let dateTokens = date.toString().split(" ");
		console.log(
			dateTokens[2] + ", " + dateTokens[1] + ", " + dateTokens[3]
		);

		const day = dateTokens[2];
		const month = determineMonth(dateTokens[1]);
		const year = dateTokens[3];

		console.log(day, month, year);

		const dateFormatted = year + "-" + month + "-" + day;

		console.log(dateFormatted);

		props.setDate(dateFormatted);
	};

	return (
		<>
			<Row className="manual-time-row centered-div">
				<Col xs={6} className="centered-div date-picker-col">
					<DatePicker
						todayButton="Today"
						selected={startTime}
						onChange={(time: any | null) =>
							handleStartTimeChange(time)
						}
						showTimeSelect
						showTimeSelectOnly // Added showTimeSelectOnly prop
						timeIntervals={15} // Optional prop to set time intervals
						dateFormat="h:mm aa" // Optional prop to set time format
						placeholderText="Start Time"
					/>
				</Col>

				<Col xs={6} className="centered-div date-picker-col">
					<DatePicker
						todayButton="Today"
						selected={endTime}
						onChange={(time: any | null) =>
							handleEndTimeChange(time)
						}
						showTimeSelect
						showTimeSelectOnly // Added showTimeSelectOnly prop
						timeIntervals={15} // Optional prop to set time intervals
						dateFormat="h:mm aa" // Optional prop to set time format
						placeholderText="End Time"
					/>
				</Col>
			</Row>
			<Row className="manual-time-row centered-div">
				<Col xs={12} className="centered-div date-picker-col">
					<DatePicker
						todayButton="Today"
						selected={selectedDate}
						onChange={(date: Date | null) =>
							handleSelectedDateChange(date)
						}
						dateFormat="yyyy-MM-d" // Optional prop to set date format
						placeholderText="Date"
					/>
				</Col>
			</Row>
		</>
	);
}

export default ManualTimeEntry;
