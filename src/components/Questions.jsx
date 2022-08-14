import { useState, useEffect } from "react"
import Question from "./Question"

function Questions({ url, setShowModal, setShowWelcome }) {
  const [ansRevealed, setAnsRevealed] = useState(false)
  const [questions, setQuestions] = useState([])
  const [points, setPoints] = useState(0)
  const [scoreText, setScoreText] = useState("")
  const [answeredIndex, setAnsweredIndex] = useState(0)

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((jsonData) => setQuestions(jsonData.results))
  }, [])

  useEffect(() => {
    setScoreText(`You scored ${points}/${questions.length} correct answers`)
  }, [points])

  async function fetchQuestions() {
    const response = await fetch(url)
    try {
      if (response.ok) {
        const jsonData = await response.json()
        return jsonData.results
      }
      throw new Error("Something went Wrong")
    } catch (err) {
      // do something
      console.log(answeredIndex)
    }
  }

  function handleSubmit() {
    answeredIndex === questions.length && setAnsRevealed(true)
  }

  function renderQuestions() {
    return questions.map((question, i) => (
      <Question
        key={i}
        setAnsweredIndex={setAnsweredIndex}
        questionData={question}
        ansRevealed={ansRevealed}
        setPoints={setPoints}
        questions={questions}
      />
    ))
  }

  function newGame() {
    fetchQuestions().then((response) => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setQuestions(response)
      setAnsRevealed(false)
      setAnsweredIndex(0)
      setPoints(0)
    })
  }

  function goBack() {
    setShowModal(true);
    setShowWelcome(true);
  }

  return (
    <div className="z-10 h-full max-w-6xl flex flex-col justify-center items-start gap-3 p-8 sm:px-16 lg:gap-8 lg:py-16">
      {questions?.length ? (
        <>
          <button
            className="text-sm self-start text-white bg-btn-blue font-inter py-1 px-2 md:text-lg lg:text-lg lg:px-8 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:rounded-lg"
            onClick={goBack}
          >
          Back
          </button>
          {renderQuestions()}
        </>
      ) : (
        <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl self-center">
          Loading Quiz...
        </p>
      )}
      <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 md:flex-row md:gap-8">
        <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl">
          {ansRevealed && scoreText}
        </p>
        {questions?.length > 0 && (
          <>
            {ansRevealed ? (
              <button
                className="self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg"
                onClick={newGame}
              >
                Play again
              </button>
            ) : answeredIndex < questions.length ? (
              <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl">
                Select the remaining {questions.length - answeredIndex}{" "}
                questions
              </p>
            ) : (
              <button
                className="self-center text-white bg-btn-blue font-inter px-6 py-2 rounded-md shadow-xl cursor-pointer transition-all hover:opacity-80 active:scale-90 focus:opacity-80 md:text-xl md:px-12 md:py-4 md:rounded-lg"
                onClick={handleSubmit}
              >
                Check Answers
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Questions
