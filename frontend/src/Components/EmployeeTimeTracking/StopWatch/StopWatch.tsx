import React, { useState } from "react";
import Timer from "./Timer";
import ControlButtons from "../ControlButtons";

import { Row, Col } from "react-bootstrap";

type StopWatchProps = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	isPaused: boolean;
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

function StopWatch({
	isActive,
	setIsActive,
	isPaused,
	setIsPaused,
	time,
	setTime,
}: StopWatchProps) {
	React.useEffect(() => {
		let interval: number = 0;

		if (isActive && isPaused === false) {
			interval = setInterval(() => {
				setTime((time) => time + 10);
			}, 10);
		} else {
			clearInterval(interval);
		}
		return () => {
			clearInterval(interval);
		};
	}, [isActive, isPaused]);

	const handleStart = () => {
		setIsActive(true);
		setIsPaused(false);
	};

	const handlePauseResume = () => {
		setIsPaused(!isPaused);
	};

	const handleReset = () => {
		setIsActive(false);
		setTime(0);
	};

	return (
		<>
			<Timer time={time} />
		</>
	);
}

export default StopWatch;
