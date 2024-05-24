import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyStorage from './components/MyStorage'
import MyMenuBar from './components/MyMenuBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyMenuBar />
      <h1>Storage</h1>
      <MyStorage />
    </>
  )
}

export default App
