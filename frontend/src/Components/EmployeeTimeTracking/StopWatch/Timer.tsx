export default function Timer(props: { time: number }) {
	return (
		<div className="timer centered-div">
			<span className="digits ">
				{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
			</span>
			<span className="digits">
				{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
			</span>
			<span className="digits mili-sec">
				{("0" + ((props.time / 10) % 100)).slice(-2)}
			</span>
		</div>
	);
}
