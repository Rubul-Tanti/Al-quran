import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingpageLayout from './pages/landingpage/layout'
import HomePage from './pages/landingpage/home'
import OurCourses from './pages/landingpage/our-courses'
import SubscriptionsPlan from './pages/landingpage/subscriptionPlans'

function App() {


  return (
    <Routes>
      <Route path='/' element={<LandingpageLayout/>}>
      <Route path="/" element={<HomePage/>} />
      <Route path="/our-course" element={<OurCourses/>} />
      <Route path="/subscription-plans" element={<SubscriptionsPlan/>} />
      </Route>
    </Routes>
  )
}

export default App
