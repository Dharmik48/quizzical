import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import yellowBlob from './images/yellow-blob.svg';
import blueBlob from './images/blue-blob.svg';

function App() {
	return (
		<div className='h-screen relative overflow-hidden'>
			<img
				src={yellowBlob}
				className='absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/3 scale-125 sm:scale-90'
				alt='yellow blob'
			/>
			<img
				src={blueBlob}
				className='absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2 scale-125 sm:scale-90'
				alt='yellow blob'
			/>
			<WelcomeScreen />
		</div>
	);
}

export default App;
