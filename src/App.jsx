import { lazy, Suspense } from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ProtectRoutes from './Pages/LandingPage/Miscelleneous/ProtectRoutes'

const Register = lazy(() => import('./Pages/LandingPage/Register'));
const Home = lazy(() => import('./Pages/LandingPage/Home'));
const Login = lazy(() => import('./Pages/LandingPage/Login'));
const Dashboard = lazy(() => import('./Pages/LandingPage/Dashboard'));
const AdminDashboard = lazy(() => import('./Pages/Admin/AdminDashboard'));
const AdminHome = lazy(() => import('./Pages/Admin/AdminHome'));
const AdminTrainers = lazy(() => import('./Pages/Admin/AdminTrainers'));
const AdminTrainerEdit = lazy(() => import('./Pages/Admin/AdminTrainerEdit'));
const AdminStudents = lazy(() => import('./Pages/Admin/AdminStudents/AdminStudents'));
const AdminStudentEdit = lazy(() => import('./Pages/Admin/AdminStudents/AdminStudentsEdit'));
const TrainerDashboard = lazy(() => import('./Pages/Trainer/TrainerDashboard'));
const QuizQuestions = lazy(() => import('./Pages/Trainer/QuizQuestions'));
const StudentDashboard = lazy(() => import('./Pages/Student/StudentDashboard'));
const StudentHome = lazy(() => import('./Pages/Student/StudentHome'));
const StudentQuiz = lazy(() => import('./Pages/Student/StudentQuiz'));
const TrainerHome = lazy(() => import('./Pages/Trainer/TrainerHome'));
const ResetPassword = lazy(() => import('./Pages/LandingPage/Miscelleneous/Password/ResetPassword'));
const GivePassword = lazy(() => import('./Pages/LandingPage/Miscelleneous/Password/GivePassword'));
const TrainerProfile = lazy(() => import('./Pages/Trainer/TrainerProfile'));
const QuizCode = lazy(() => import('./Pages/Trainer/QuizCode'));
const QuizCreate = lazy(() => import('./Pages/Trainer/QuizCreate'));
const QuizEdit = lazy(() => import('./Pages/Trainer/QuizEdit'));
const QuestionEdit = lazy(() => import('./Pages/Trainer/QuestionEdit'));
const StudentExams = lazy(() => import('./Pages/Student/StudentExams'));
const QuizCodeEnter = lazy(() => import('./Pages/Student/QuizCodeEnter'));
const QuizInfo = lazy(() => import('./Pages/Student/QuizInfo'));
const Result = lazy(() => import('./Pages/Student/Result'));
const AllResult = lazy(() => import('./Pages/Trainer/AllResult'));
const StudentProfile = lazy(() => import('./Pages/Student/StudentProfile'));
const StudentMembership = lazy(() => import('./Pages/Student/StudentMembership'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  )
}

export default App
