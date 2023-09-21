//Component Imports
import { useEffect } from "react";
import Timer from "./Timer";

type StopWatchProps = {
	isActive: boolean;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	isPaused: boolean;
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
	time: number;
	setTime: React.Dispatch<React.SetStateAction<number>>;
};

function StopWatch({ isActive, isPaused, time, setTime }: StopWatchProps) {
	useEffect(() => {
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

	return (
		<>
			<Timer time={time} />
		</>
	);
}

export default StopWatch;
