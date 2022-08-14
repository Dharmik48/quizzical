import React from "react";
import { Modal } from "../components/Modal";

export function StartModal({ onClose, onSelectParams, setShowWelcome }) {
	const [categories, setCategories] = React.useState([]);
	const [params, setParams] = React.useState({
		amount: 10, // do something with this ??
		type: "multiple",
		category: null,
		difficulty: "easy",
	});

	React.useEffect(() => {
		async function fetchCategories() {
			const response = await fetch("https://opentdb.com/api_category.php");
			try {
				if (response.ok) {
					const responseData = await response.json();
					return responseData.trivia_categories;
				}
				throw new Error("Something went wrong");
			} catch (err) {
				// do something
				console.log(err);
			}
		}
		fetchCategories().then((res) => {
			setCategories(res);
		});
	}, []);

	React.useEffect(() => {
		let query = Object.keys(params)
			.filter((item) => params[item] !== null)
			.map((k) => {
				const key = encodeURIComponent(k);
				const value = encodeURIComponent(params[k]);

				return `${key}=${value}`;
			})
			.join("&");

		onSelectParams(query);
		// do something with new query
	}, [params]);

	const handleClose = () => {
		onClose();
		setShowWelcome(false);
	};

	return (
		<Modal>
			<div className="flex flex-col items-center w-full">
				<h2 className="text-xl">Choose a Level</h2>
				{/* difficulty selector here */}
				<p className="text-gray-500 mt-1">
					Select a level and challenge yourself{" "}
				</p>
			</div>

			<div className="flex flex-row mb-4">
				<div className="flex items-center mx-2">
					<input
						id="default-radio-1"
						type="radio"
						value="easy"
						name="default-radio"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						onChange={(evt) => {
							setParams({ ...params, difficulty: evt.target.value });
						}}
					/>
					<label htmlFor="default-radio-1" className="ml-2 text-sm ">
						Easy
					</label>
				</div>
				<div className="flex items-center mx-2">
					<input
						id="default-radio-2"
						type="radio"
						value="medium"
						name="default-radio"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						onChange={(evt) => {
							setParams({ ...params, difficulty: evt.target.value });
						}}
					/>
					<label htmlFor="default-radio-2" className="ml-2 text-sm ">
						Medium
					</label>
				</div>
				<div className="flex items-center mx-2">
					<input
						id="default-radio-3"
						type="radio"
						value="hard"
						name="default-radio"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						onChange={(evt) => {
							setParams({ ...params, difficulty: evt.target.value });
						}}
					/>
					<label htmlFor="default-radio-3" className="ml-2 text-sm ">
						Hard
					</label>
				</div>
			</div>
			<div>
				<div className="flex flex-col items-center w-full">
					<h2 className="text-xl">Choose Number of Question</h2>
					<p className="text-gray-500 mt-1">
						Choose how many questions you are comfortable with.
					</p>
				</div>
				<div className="flex flex-row  justify-center items-center mt-3">
					<select
						id="questions"
						className="bg-gray-50 border text-gray-500 text-l rounded-lg block p-3.5"
						onChange={(e) => {
							setParams({ ...params, amount: e.target.value });
						}}
					>
						<option value="5" align="center" selected>
							5
						</option>
						<option value="10" align="center">
							10
						</option>
						<option value="15" align="center">
							15
						</option>
					</select>
				</div>
			</div>
			<div className="flex flex-col items-center w-full">
				<h2 className="text-xl">Choose a Category</h2>
				<p className="text-gray-500 mt-1">
					Select a category below that you think is fun{" "}
				</p>
			</div>

			{/* maybe add amount of questions here? */}

			<div className="flex gap-2 flex-wrap">
				{categories ? (
					categories
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((category, index) => (
							<div
								key={index}
								className={`${
									params.category === category.id
										? "bg-slate-200"
										: "bg-slate-50"
								} hover:bg-slate-200 rounded-xl p-2 cursor-pointer`}
								onClick={() => {
									console.log("test");
									setParams({ ...params, category: category.id });
								}}
							>
								<span className="text-sm">{category.name}</span>
							</div>
						))
				) : (
					<span>Loading...</span>
				)}
			</div>
			<div></div>
			<div className="flex gap-x-4 ml-auto">
				<button className="flex-1" onClick={() => onClose()}>
					Back
				</button>
				<button
					className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={handleClose}
				>
					Start
				</button>
			</div>
		</Modal>
	);
}
