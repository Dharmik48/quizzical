import React from "react"
import { Modal } from "../components/Modal"

const DIFFICULTIES = [null, "easy", "medium", "hard"]

export function StartModal({ onClose, onSelectParams, setShowWelcome }) {
  const [difficultyTab, setDifficultyTab] = React.useState(DIFFICULTIES[0])
  const [categories, setCategories] = React.useState([])
  const [params, setParams] = React.useState({
    amount: 5, // do something with this ??
    type: "multiple",
    category: null,
    difficulty: null,
  })

  React.useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("https://opentdb.com/api_category.php")
      try {
        if (response.ok) {
          const responseData = await response.json()
          return responseData.trivia_categories
        }
        throw new Error("Something went wrong")
      } catch (err) {
        // do something
        console.log(err)
      }
    }
    fetchCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  React.useEffect(() => {
    let query = Object.keys(params)
      .filter((item) => params[item] !== null)
      .map((k) => {
        const key = encodeURIComponent(k)
        const value = encodeURIComponent(params[k])

        return `${key}=${value}`
      })
      .join("&")

    onSelectParams(query)
    // do something with new query
  }, [params])

  const handleClose = () => {
    onClose()
    setShowWelcome(false)
  }

  const handleDiff = (diff) => {
    setDifficultyTab(diff)
    setParams({ ...params, difficulty: diff })
  }

  return (
    <Modal>
      <div>
        <h1 className="text-2xl font-medium">Create a Game</h1>
        <p className="mt-3 text-gray-500">
          Choose difficulty, number of questions, and a category you would like
          the game to be played on.
        </p>
      </div>

      <div className="flex flex-col">
        <h2 className="text-lg font-medium">Difficulties</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-3 gap-2">
          {DIFFICULTIES.map((diff, i) => (
            <div
              className={`min-w-[50%] min-h-[50px] border rounded-md p-4 cursor-pointer ${
                difficultyTab === diff ? "border-gray-800" : "border-gray-300"
              }`}
              onClick={() => handleDiff(diff)}
            >
              <div className="flex justify-between items-center">
                <span className="capitalize">
                  {diff !== null ? diff : "Random"}
                </span>
                <div
                  className={`w-5 h-5 border rounded p-[1px] ${
                    difficultyTab === diff
                      ? "border-gray-800"
                      : "border-gray-300"
                  }`}
                >
                  {difficultyTab === diff && (
                    <div className="flex rounded w-full h-full bg-gray-900" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-4" />

      <div>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-lg font-medium">Choose Number of Questions</h2>
          <div className="flex items-center">
            <select
              id="questions"
              className="bg-gray-50 border text-gray-500 text-lg rounded-lg p-3.5 cursor-pointer"
              onChange={(e) => {
                setParams({ ...params, amount: e.target.value })
              }}
            >
              <option value="5" align="center" defaultValue={5}>
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
      </div>

      <div className="w-full h-[1px] bg-gray-200 my-4" />

      <div className="flex flex-col w-full">
        <h2 className="text-lg font-medium">Choose a Category</h2>
      </div>
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
                } hover:bg-slate-200 rounded p-2 cursor-pointer`}
                onClick={() => {
                  setParams({ ...params, category: category.id })
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
  )
}
