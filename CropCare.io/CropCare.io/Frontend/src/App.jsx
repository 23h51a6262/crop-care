import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navbar } from './components/navabr'
import HomePage from './components/homepage'
import Aboutuspage from './components/aboutuspage'
import Contactpage from './components/contactpage'
import Services from './components/services'
import footer from './components/fotter'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Aboutuspage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contactpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App