
import { Route, Routes } from 'react-router-dom'
import LandingpageLayout from './pages/landingpage/layout'
import HomePage from './pages/landingpage/home'
import OurCourses from './pages/landingpage/our-courses'
import SubscriptionsPlan from './pages/landingpage/subscriptionPlans'
import Login from './pages/Login&signup/login'
import RoleSelection from './pages/Login&signup/role-selection'
import StudentRegistration from './pages/Login&signup/student-registration'
import TutorRegisterForm from './pages/Login&signup/tutor-registration'
import Signup from './pages/Login&signup/signup'

function App() {


  return (
    <Routes>
      <Route path='/' element={<LandingpageLayout/>}>
      <Route path="/" element={<HomePage/>} />
      <Route path="/our-course" element={<OurCourses/>} />
      <Route path="/subscription-plans" element={<SubscriptionsPlan/>} />
      </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}>
    <Route path="/signup/role-selection" element={<RoleSelection/>}/>
    <Route path="/signup/student-registration" element={<StudentRegistration/>}/>
    <Route path="/signup/tutor-registration" element={<TutorRegisterForm/>}/>
    </Route>
    </Routes>
  )
}

export default App
