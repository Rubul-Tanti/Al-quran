import { useState } from 'react'
import Header from './components/landingpage/header'
import Hero from './components/landingpage/Hero'
import Stats from './components/landingpage/stats'
import EasyToStart from './components/landingpage/easyToStart'
import Features from './components/landingpage/features'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
      <Stats/>
      <EasyToStart/>
      <Features/>
    </>
  )
}

export default App
