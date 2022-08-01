import { useEffect, useState } from "react"
import Choice from "./Choice"

function Question({ questionData, ansRevealed, setPoints, questions }) {
  const [selectedAns, setSelectedAns] = useState("")
  const [choices, setChoices] = useState([])
  const answer = questionData && questionData.correct_answer

  function randomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  useEffect(() => {
    ansRevealed &&
      answer === selectedAns &&
      setPoints((prevPoints) => (prevPoints += 1))
  }, [ansRevealed])

  useEffect(() => {
    if (!questionData) return
    const allChoices = [...questionData.incorrect_answers]
    allChoices.splice(
      randomIndex(questionData.incorrect_answers.length),
      0,
      questionData.correct_answer
    )
    setChoices(
      allChoices.map((choice, i) => ({ id: i, text: choice, selected: false }))
    )
    setSelectedAns("")
  }, [questions])

  function renderChoices() {
    return choices.map((choice) => (
      <Choice
        ansRevealed={ansRevealed}
        setSelectedAns={setSelectedAns}
        choice={choice}
        selectedAns={selectedAns}
        key={choice.id}
        setPoints={setPoints}
        answer={answer}
      />
    ))
  }

  return (
    <div className="flex flex-col gap-4 border-b-2 pb-4 w-full border-b-stroke lg:gap-6 lg:pb-6">
      <p className="text-md font-karla text-text-blue md:text-xl lg:text-2xl">
        {questionData.question}
      </p>
      <div className="flex flex-wrap gap-4 lg:gap-8">{renderChoices()}</div>
    </div>
  )
}

export default Question
