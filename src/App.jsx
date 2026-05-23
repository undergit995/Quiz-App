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


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}>
          <Route index element={<AdminHome/>}/>
          <Route path='/admindashboard/dashboard' element={<AdminHome/>}/>
          <Route path='/admindashboard/trainers' element={<AdminTrainers/>}/>
          <Route path='/admindashboard/students' element={<AdminStudents/>}/>
          <Route path='/admindashboard/edittrainers/:id' element={<AdminTrainerEdit/>}/>
          <Route path='/admindashboard/editstudents/:id' element={<AdminStudentEdit/>}/>
        </Route>
        {/* <Route path='/' element={<Dashboard/>}>
          <Route index element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
