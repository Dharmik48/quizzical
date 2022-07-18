import { useState, useEffect } from 'react';
import Question from './Question';

function Questions() {
	const [ansRevealed, setAnsRevealed] = useState(false);
	const [questions, setQuestions] = useState([]);
	const points = 5;

	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy')
			.then(data => data.json())
			.then(jsonData => setQuestions(jsonData.results));
	}, []);

	function renderQuestions() {
		return questions.map((question, i) => (
			<Question
				key={i}
				questionData={question}
				ansRevealed={ansRevealed}
				points={points}
			/>
		));
	}

	function checkAnswers() {
		setAnsRevealed(true);
	}

	return (
		<div className='z-10 h-full max-w-6xl flex flex-col justify-center items-start gap-3 p-8 sm:px-16 lg:gap-8 lg:py-16'>
			{renderQuestions()}
			{ansRevealed && points}
			<button
				className='self-center text-white bg-btn-blue font-inter px-6 py-2 mt-4 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg'
				onClick={checkAnswers}
			>
				Check Answers
			</button>
		</div>
	);
}

export default Questions;
