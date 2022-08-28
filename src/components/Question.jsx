import { useEffect, useState } from "react"
import Choice from "./Choice"
import { decode } from "html-entities"

function Question({
  questionData,
  ansRevealed,
  setPoints,
  questions,
  setAnsweredIndex,
}) {
  const [selectedAns, setSelectedAns] = useState("")
  const [choices, setChoices] = useState([])
  const [click, setClick] = useState(0)

  const answer = questionData && questionData.correct_answer

  function randomIndex(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  function handleFirstClick() {
    if (click === 0) {
      setClick((state) => state + 1)
      setAnsweredIndex((state) => state + 1)
    }
  }

  useEffect(() => {
    ansRevealed &&
      answer === selectedAns &&
      setPoints((prevPoints) => (prevPoints += 1))
    setClick(0)
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
        handleFirstClick={handleFirstClick}
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
        {decode(questionData.question)}
      </p>
      <div className="flex flex-wrap gap-4 lg:gap-8">{renderChoices()}</div>
    </div>
  )
}

export default Question
