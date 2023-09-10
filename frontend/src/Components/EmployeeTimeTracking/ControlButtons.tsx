interface ControlButtonsProps {
	active: boolean;
	isPaused: boolean;
	handleStart: () => void;
	handlePauseResume: () => void;
	handleReset: () => void;
}

export default function ControlButtons(props: ControlButtonsProps) {
	const StartButton = (
		<div className="btn btn-one btn-start" onClick={props.handleStart}>
			Start
		</div>
	);
	const ActiveButtons = (
		<div className="btn-grp">
			<div className="btn btn-two" onClick={props.handleReset}>
				Reset
			</div>
			<div className="btn btn-one" onClick={props.handlePauseResume}>
				{props.isPaused ? "Resume" : "Pause"}
			</div>
		</div>
	);

	return (
		<div className="button-div">
			<button className="add-time-slots-start-button">
				{props.active ? ActiveButtons : StartButton}
			</button>
		</div>
	);
}
