import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/main/Main'

// Main, Sidebar component mounted on our app component for testing purposes
const App = () => {
  return (
    <>
      <Sidebar />
      <Main />
    </>
  )
}

export default App