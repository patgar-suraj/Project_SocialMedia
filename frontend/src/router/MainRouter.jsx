import React from 'react'
import { Route, Routes } from 'react-router-dom'

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/api/auth/register' element={<Register/>}/>
        <Route path='/api/auth/login' element={<Login/>}/>
        <Route path='/api/post/' element={<Home/>}/>
    </Routes>
  )
}

export default MainRouter