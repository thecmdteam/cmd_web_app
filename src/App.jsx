import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailValidationRedirect from './containers/EmailValidationRedirect'
import Home from './containers/Home'
import Login from './containers/Login'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/validate/:type' element={<EmailValidationRedirect />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App