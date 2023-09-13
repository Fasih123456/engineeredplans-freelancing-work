import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";

function ManualTimeEntry() {
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	return (
		<>
			<Row className="manual-time-row">
				<Col className="manual-time-div">
					Start Time{" "}
					<DatePicker
						todayButton="Today"
						selected={startDate}
						onChange={(date: Date | null) =>
							date && setStartDate(date)
						}
						showTimeSelect
					/>
				</Col>
				<Col className="manual-time-div">
					End Time{" "}
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

			<Row className="manual-time-row">
				<button className="submit-manual-btn">Add</button>
			</Row>
		</>
	);
}

export default ManualTimeEntry;
