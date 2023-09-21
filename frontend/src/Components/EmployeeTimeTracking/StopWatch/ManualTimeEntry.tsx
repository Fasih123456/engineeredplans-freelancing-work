//react imports
import { useState } from "react";

//Library imports
import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";

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
