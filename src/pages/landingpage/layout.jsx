import Header from"../../components/landingpage/header"
import Footer from"../../components/landingpage/footer"
import { Outlet, Route, Routes } from 'react-router-dom'
import HomePage from "./home"
import OurCourses from "./our-courses"
import SubscriptionsPlan from "./subscriptionPlans"

const LandingpageLayout = () => {
  return (
 <>
     <Header/>
<Outlet/>
    <Footer/>
 </>
  )
}

export default LandingpageLayout
