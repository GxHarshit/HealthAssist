import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Register from '../screens/Register'
import HomePage from '../screens/HomePage'

function AppRoutes() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default AppRoutes