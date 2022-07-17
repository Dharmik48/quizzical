module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			karla: ['Karla', 'sans-serif'],
			inter: ['inter', 'sans-serif'],
		},
		extend: {
			colors: {
				'bg-blue': '#F5F7FB',
				'btn-blue': '#4D5B9E',
				'text-blue': '#293264',
				'bg-text': '#D6DBF5',
				'correct-green': '#94D7A2',
				'wrong-red': '#F8BCBC',
				stroke: '#DBDEF0',
			},
		},
	},
	plugins: [],
};
