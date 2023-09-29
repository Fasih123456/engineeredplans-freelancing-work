//react imports
import { useState } from "react";

//Library imports
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

//TODO: Make the manual time entry show the time as well
//TODO: The CSS for this is broken
function ManualTimeEntry() {
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	return (
		<>
			<Row className="manual-time-row centered-div">
				<Col xs={6} className="centered-div date-picker-col">
					<DatePicker
						todayButton="Today"
						selected={startDate}
						onChange={(date: Date | null) =>
							date && setStartDate(date)
						}
						showTimeSelect
					/>
				</Col>

				<Col xs={6} className="centered-div date-picker-col">
					<DatePicker
						todayButton="Today"
						selected={startDate}
						onChange={(date: Date | null) =>
							date && setStartDate(date)
						}
						showTimeSelect
					/>
				</Col>
			</Row>
		</>
	);
}

export default ManualTimeEntry;
