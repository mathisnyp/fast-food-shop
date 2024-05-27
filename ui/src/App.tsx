import React from "react"
import Routes from "./Routes"
import { Header } from "./components"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Header />
      </Routes>
    </Router>
  )
}

export default App
