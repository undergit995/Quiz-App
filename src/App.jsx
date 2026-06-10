import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './Pages/LandingPage/Register'
import Home from './Pages/LandingPage/Home'
import Login from './Pages/LandingPage/Login'
import Dashboard from './Pages/LandingPage/Dashboard'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminHome from './Pages/Admin/AdminHome'
import AdminTrainers from './Pages/Admin/AdminTrainers'
import AdminTrainerEdit from './Pages/Admin/AdminTrainerEdit';
import AdminStudents from './Pages/Admin/AdminStudents/AdminStudents'
import AdminStudentEdit from './Pages/Admin/AdminStudents/AdminStudentsEdit'
import TrainerDashboard from './Pages/Trainer/TrainerDashboard'
import QuizQuestions from './Pages/Trainer/QuizQuestions'
import StudentDashboard from './Pages/Student/StudentDashboard'
import StudentHome from './Pages/Student/StudentHome'
import StudentQuiz from './Pages/Student/StudentQuiz'
import TrainerHome from './Pages/Trainer/TrainerHome'
import ResetPassword from './Pages/LandingPage/Miscelleneous/Password/ResetPassword'
import GivePassword from './Pages/LandingPage/Miscelleneous/Password/GivePassword'
import TrainerProfile from './Pages/Trainer/TrainerProfile'
import ProtectRoutes from './Pages/LandingPage/Miscelleneous/ProtectRoutes'
import QuizCode from './Pages/Trainer/QuizCode'
import QuizCreate from './Pages/Trainer/QuizCreate'
import QuizEdit from './Pages/Trainer/QuizEdit'
import QuestionEdit from './Pages/Trainer/QuestionEdit'
import StudentExams from './Pages/Student/StudentExams'
import QuizCodeEnter from './Pages/Student/QuizCodeEnter'
import QuizInfo from './Pages/Student/QuizInfo'
import Result from './Pages/Student/Result'
import AllResult from './Pages/Trainer/AllResult'
import StudentProfile from './Pages/Student/StudentProfile'
import StudentMembership from './Pages/Student/StudentMembership'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/changepassword/:token' element={<GivePassword/>}/>
        </Route>
        <Route path='/admindashboard' element={<ProtectRoutes role='admin'><AdminDashboard/></ProtectRoutes>}>
          <Route index element={<AdminHome/>}/>
          <Route path='/admindashboard/dashboard' element={<AdminHome/>}/>
          <Route path='/admindashboard/trainers' element={<AdminTrainers/>}/>
          <Route path='/admindashboard/edittrainers/:id' element={<AdminTrainerEdit/>}/>
          <Route path='/admindashboard/students' element={<AdminStudents/>}/>
          <Route path='/admindashboard/editstudents/:id' element={<AdminStudentEdit/>}/>
        </Route>
        <Route path='/trainerdashboard' element={<ProtectRoutes role='trainer'><TrainerDashboard/></ProtectRoutes>}>
          <Route index element={<TrainerHome/>}/>
          <Route path='/trainerdashboard/home' element={<TrainerHome/>}/>
        <Route path='/trainerdashboard/profile' element={<TrainerProfile/>}/>
            <Route path='/trainerdashboard/quiz/update/:id' element={<QuizEdit/>}/>
            <Route path='/trainerdashboard/quiz/result/:id' element={<AllResult/>}/>
            <Route path='/trainerdashboard/question/update/:id' element={<QuestionEdit/>}/>
          <Route path='/trainerdashboard/quiz' element={<QuizCreate/>}>
            <Route index element={<QuizCode/>}/>
            <Route path='/trainerdashboard/quiz/code' element={<QuizCode/>}/>
            <Route path='/trainerdashboard/quiz/questions/:id' element={<QuizQuestions/>}/>
          </Route>
        </Route>
        <Route path='/studentdashboard' element={<ProtectRoutes role='student'><StudentDashboard/></ProtectRoutes>}>
          <Route index element={<StudentHome/>}/>
          <Route path='/studentdashboard/home' element={<StudentHome/>}/>
          <Route path='/studentdashboard/quiz' element={<StudentExams/>}/>
          <Route path='/studentdashboard/quiz/premium' element={<StudentMembership/>}/>
          <Route path='/studentdashboard/quiz/code/:id' element={<QuizCodeEnter/>}/>
           <Route path='/studentdashboard/profile' element={<StudentProfile/>}/>
          <Route path='/studentdashboard/quiz/result' element={<Result/>}/>
        </Route>
          <Route path='/student/quiz/test/:id' element={<ProtectRoutes role='student'><StudentQuiz/> </ProtectRoutes>}/>
          <Route path='/student/quiz/info/:id' element={<ProtectRoutes role='student'><QuizInfo/></ProtectRoutes>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
