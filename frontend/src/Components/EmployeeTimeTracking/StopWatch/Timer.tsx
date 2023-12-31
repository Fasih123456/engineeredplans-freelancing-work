//TODO: Make the timer have a different color theme when active
export default function Timer(props: { time: number }) {
	return (
		<div className="timer centered-div">
			<span className="digits">
				{("0" + Math.floor(props.time / 3600000)).slice(-2)}:
			</span>
			<span className="digits">
				{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
			</span>
			<span className="digits">
				{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
			</span>
		</div>
	);
}
