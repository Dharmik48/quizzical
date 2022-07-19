import { useEffect, useState } from 'react';
import Choice from './Choice';

function Question({ questionData, ansRevealed, setPoints, questions }) {
	const [ansIndex, setAnsIndex] = useState(randomIndex());
	const [selectedAns, setSelectedAns] = useState('');
	const [choices, setChoices] = useState([]);

	function randomIndex() {
		return Math.floor(Math.random() * 4);
	}

	useEffect(() => {
		ansRevealed &&
			ansIndex === selectedAns &&
			setPoints(prevPoints => (prevPoints += 1));
	}, [ansRevealed]);

	useEffect(() => {
		const allChoices = [...questionData.incorrect_answers];
		allChoices.splice(ansIndex, 0, questionData.correct_answer);
		setChoices(
			allChoices.map((choice, i) => ({ id: i, text: choice, selected: false }))
		);
		setAnsIndex(randomIndex());
		setSelectedAns('');
	}, [questions]);

	function renderChoices() {
		return choices.map(choice => (
			<Choice
				ansRevealed={ansRevealed}
				setSelectedAns={setSelectedAns}
				choice={choice}
				selectedAns={selectedAns}
				key={choice.id}
				ansIndex={ansIndex}
			/>
		));
	}

	return (
		<div className='flex flex-col gap-4 border-b-2 pb-4 w-full border-b-stroke lg:gap-6 lg:pb-6'>
			<p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl'>
				{questionData.question}
			</p>
			<div className='flex flex-wrap gap-4 lg:gap-8'>{renderChoices()}</div>
		</div>
	);
}

export default Question;
