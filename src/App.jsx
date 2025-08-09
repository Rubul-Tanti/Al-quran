
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
import Student from './pages/student/home'
import StudentDashboard from './components/Student/dashboard'
import FindTeachers from './components/Student/findteacher'
import Chat from './components/common/message'
import SavedTeachers from './components/savedTeachers'
import Mybooking from './components/mybooking'
import Settings from './components/settings'

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
    <Route path="/student" element={<Student/>}>
    <Route path="dashboard" element={<StudentDashboard/>} />
    <Route path="find-teachers" element={<FindTeachers/>} />
    <Route path="messages" element={<Chat/>} />
    <Route path="settings" element={<Settings/>} />
    <Route path="mybooking" element={<Mybooking/>} />
    <Route path="savedteachers" element={<SavedTeachers/>} />
    </Route>
    </Routes>
  )
}

export default App
