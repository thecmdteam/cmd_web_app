import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmailValidationRedirect from './pages/redirect/EmailValidationRedirect'
import Home from './containers/home/Home'
import Login from './pages/login/Login'

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