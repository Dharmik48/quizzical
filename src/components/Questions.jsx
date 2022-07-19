import { useState, useEffect } from 'react';
import Question from './Question';

function Questions() {
	const [ansRevealed, setAnsRevealed] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [points, setPoints] = useState(0);
	const [scoreText, setScoreText] = useState('');

	const URL =
		'https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy';

	useEffect(() => {
		fetch(URL)
			.then(data => data.json())
			.then(jsonData => setQuestions(jsonData.results));
	}, []);

	useEffect(() => {
		setScoreText(`You scored ${points}/5 correct answers`);
	}, [points]);

	async function fetchQuestions() {
		const data = await fetch(URL);
		const jsonData = await data.json();
		return jsonData;
	}

	function renderQuestions() {
		return questions.map((question, i) => (
			<Question
				key={i}
				questionData={question}
				ansRevealed={ansRevealed}
				setPoints={setPoints}
				questions={questions}
			/>
		));
	}

	function newGame() {
		fetch(URL)
			.then(data => data.json())
			.then(jsonData => setQuestions(jsonData.results));
		setAnsRevealed(false);
		setPoints(0);
		setScoreText('');
	}

	return (
		<div className='z-10 h-full max-w-6xl flex flex-col justify-center items-start gap-3 p-8 sm:px-16 lg:gap-8 lg:py-16'>
			{renderQuestions()}
			<div className='flex flex-col items-center justify-center w-full gap-4 mt-4 md:flex-row md:gap-8'>
				<p className='text-md font-karla text-text-blue md:text-xl lg:text-2xl'>
					{ansRevealed && scoreText}
				</p>
				{!ansRevealed ? (
					<button
						className='self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg'
						onClick={() => setAnsRevealed(true)}
					>
						Check Answers
					</button>
				) : (
					<button
						className='self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg'
						onClick={newGame}
					>
						Play again
					</button>
				)}
			</div>
		</div>
	);
}

export default Questions;
