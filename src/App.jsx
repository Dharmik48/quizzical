import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Questions from './components/Questions';
import yellowBlob from './images/yellow-blob.svg';
import blueBlob from './images/blue-blob.svg';

function App() {
	const [showWelcome, setShowWelcome] = useState(true);

	return (
		<div className='min-h-screen flex items-center justify-center bg-bg-blue relative overflow-hidden'>
			<img
				src={yellowBlob}
				className='pointer-events-none absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/3 scale-125 sm:scale-90'
				alt='yellow blob'
			/>
			<img
				src={blueBlob}
				className='pointer-events-none absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2 scale-125 sm:scale-90'
				alt='yellow blob'
			/>
			{showWelcome ? (
				<WelcomeScreen setShowWelcome={setShowWelcome} />
			) : (
				<Questions />
			)}
		</div>
	);
}

export default App;
