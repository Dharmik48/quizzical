import { useState, useEffect } from 'react';
import Question from './Question';

function Questions() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch('https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy')
			.then(data => data.json())
			.then(jsonData => setQuestions(jsonData.results));
	}, []);

	function renderQuestions() {
		return questions.map((question, i) => (
			<Question key={i} questionData={question} />
		));
	}

	return (
		<div className='h-full flex flex-col justify-center items-start gap-3 p-8'>
			{renderQuestions()}
		</div>
	);
}

export default Questions;
