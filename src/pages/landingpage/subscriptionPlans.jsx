import React from 'react'
import PlansFlipCard from '../../components/landingpage/subscription/our-plans'
import Faq from '../../components/landingpage/subscription/faq'
import { Link } from 'react-router-dom'

const SubscriptionsPlan = () => {
  return (
    <>
       <p className="pl-4 py-2 text-sm text-blue-800 bg-blue-100 w-full flex items-center gap-2">
  <Link
    to="/"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    Home
  </Link>
  <span>/</span>
  <Link
    to="/our-course"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    Our Course
  </Link>
  <span>/</span>
  <Link
    to="/subscription-plans"
    className="hover:text-blue-600 transition-colors duration-200 font-medium"
  >
    Subscription Plans
  </Link>
</p>
    <PlansFlipCard />
    <Faq/>
    </>
  )
}

export default SubscriptionsPlan
