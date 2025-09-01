import { Routes, Route } from "react-router-dom";
import LandingpageLayout from "./pages/landingpage/layout";
import HomePage from "./pages/landingpage/home";
import OurCourses from "./pages/landingpage/our-courses";
import SubscriptionsPlan from "./pages/landingpage/subscriptionPlans";
import Login from "./pages/Login&signup/login";
import RoleSelection from "./pages/Login&signup/role-selection";
import StudentRegistration from "./pages/Login&signup/student-registration";
import TutorRegisterForm from "./pages/Login&signup/tutor-registration";
import Signup from "./pages/Login&signup/signup";
import { ToastContainer } from "react-toastify";
import StudentDashboard from "./components/Student/dashboard";
import FindTeachers from "./components/Student/findteacher";
import Chat from "./components/common/message";
import Settings from "./components/settings";
import Layoutpage from "./pages/student/home";
import TeacherDashboard from "./components/teacher/dashboard";
import Videocall from "./components/common/Videocall";
import AuthGuard from "./protectedRoutes";
import DashboardLaout from "./components/dashboardLaout";
import MyPosts from "./components/jobPost/postPage";
import CreatePost from "./components/jobPost/createpost";
import CourseList from "./components/teacher/findStudents";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthGuard />}>
          {/* Public landing routes */}
          <Route path="/" element={<LandingpageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-course" element={<OurCourses />} />
            <Route path="/subscription-plans" element={<SubscriptionsPlan />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />}>
            <Route path="/signup/role-selection" element={<RoleSelection />} />
            <Route path="/signup/student-registration" element={<StudentRegistration />} />
            <Route path="/signup/tutor-registration" element={<TutorRegisterForm />} />
          </Route>

          {/* Protected routes */}
          <Route  element={<Layoutpage />}>
            <Route path="dashboard" element={<DashboardLaout/>} />
            <Route path="find-teachers" element={<FindTeachers />} />
            <Route path="messages" element={<Chat />} />
          <Route path="/jobpost" element={<MyPosts/>}/>
          <Route path="/create-job" element={<CreatePost/>}/>
          <Route path="/find-students" element={<CourseList/>}/>
          </Route>

          <Route path="/settings" element={<Settings />} />
          <Route path="/videocall" element={<Videocall />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;

