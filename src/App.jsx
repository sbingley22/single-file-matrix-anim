import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState(0)

  return (
    <>
      { mode == 0 && <Game /> }
    </>
  )
}

export default App
