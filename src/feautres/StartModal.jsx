import React from "react"
import { Modal } from "../components/Modal"

export function StartModal({ onClose, onSelectParams, setShowWelcome }) {
  const [categories, setCategories] = React.useState([])
  const [params, setParams] = React.useState({
    amount: 10, // do something with this ??
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

  return (
    <Modal>
      <div className="flex flex-col items-center">
        <h2 className="text-xl">Choose a Category</h2>
        <p className="text-gray-500 mt-1">
          Select a category below that you think is fun{" "}
        </p>
      </div>

      {/* difficulty selector here */}
      <div>
        <span onClick={() => setParams({ ...params, difficulty: "easy" })}>
          easy
        </span>
        <span>medium</span>
        <span>hard</span>
      </div>

      {/* maybe add amount of questions here? */}

      <div className="flex gap-2 flex-wrap mt-4">
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
                  console.log("test")
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
