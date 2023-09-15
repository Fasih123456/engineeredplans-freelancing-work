import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState } from "react";

function ManualTimeEntry() {
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	return (
		<>
			<Row className="manual-time-row">
				<Col xs={5}>
					<DatePicker
						todayButton="Today"
						selected={startDate}
						onChange={(date: Date | null) =>
							date && setStartDate(date)
						}
						showTimeSelect
					/>
				</Col>

				<Col xs={5}>
					{" "}
					<DatePicker
						todayButton="Today"
						selected={startDate}
						onChange={(date: Date | null) =>
							date && setStartDate(date)
						}
						showTimeSelect
					/>
				</Col>
				<Col xs={2}>
					<button className="submit-manual-btn">Add</button>
				</Col>
			</Row>
		</>
	);
}

export default ManualTimeEntry;
