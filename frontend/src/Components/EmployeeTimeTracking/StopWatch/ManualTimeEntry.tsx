import { Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";

function ManualTimeEntry() {
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
