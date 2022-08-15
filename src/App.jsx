import { useState } from "react"
import WelcomeScreen from "./components/WelcomeScreen"
import { Portal } from "./components/Modal"
import Questions from "./components/Questions"
import { StartModal } from "./feautres"
import yellowBlob from "./images/yellow-blob.svg"
import blueBlob from "./images/blue-blob.svg"

function App() {
  const BASE_URL = "https://opentdb.com/api.php?"

  const [url, setUrl] = useState(BASE_URL)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const handleChangeUrl = (params) => setUrl(BASE_URL + params)

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-blue relative overflow-hidden">
      <img
        src={yellowBlob}
        className="pointer-events-none absolute top-0 right-0 -rotate-12 translate-x-1/2 -translate-y-1/3 scale-125 sm:scale-90"
        alt="yellow blob"
      />
      <img
        src={blueBlob}
        className="pointer-events-none absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/2 scale-125 sm:scale-90"
        alt="yellow blob"
      />

      {showWelcome ? (
        <WelcomeScreen setShowModal={setShowModal} />
      ) : (
        <Questions
          url={url}
          setShowModal={setShowModal}
          setShowWelcome={setShowWelcome}
        />
      )}

      {showModal && (
        <Portal className="portal" onClick={() => setShowModal(false)} />
      )}
      {showModal && (
        <StartModal
          onClose={() => setShowModal(false)}
          onSelectParams={handleChangeUrl}
          setShowWelcome={setShowWelcome}
        />
      )}
    </div>
  )
}

export default App
