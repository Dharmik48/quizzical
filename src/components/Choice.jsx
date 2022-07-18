function Choice({
	choice,
	ansIndex,
	ansRevealed,
	setSelectedAns,
	selectedAns,
	points,
}) {
	let styles = '';
	if (!ansRevealed && selectedAns === choice.id) {
		styles = 'bg-bg-text border-bg-text';
	} else if (ansRevealed && choice.id === ansIndex) {
		styles = 'border-correct-green bg-correct-green';
	} else if (ansRevealed && choice.id === selectedAns) {
		console.log(points);
		points -= 1;
		console.log(points);
		styles = 'border-wrong-red bg-wrong-red opacity-60';
	} else if (ansRevealed) {
		styles = 'opacity-60';
	}

	function handleClick() {
		!ansRevealed && setSelectedAns(choice.id);
	}

	return (
		<button
			className={`text-sm text-text-blue border-2 border-btn-blue min-w-fit rounded-lg py-1 px-2 md:text-lg lg:text-lg lg:px-8 lg:rounded-xl transition-colors ${
				!ansRevealed
					? 'hover:bg-bg-text focus:bg-bg-text focus:outline-none'
					: ''
			} ${styles}`}
			onClick={handleClick}
		>
			{choice.text}
		</button>
	);
}

export default Choice;
