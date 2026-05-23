import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBigLeftIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from '../../../Components/styledComponents/Buttons';
import { putStudents } from '../../../Redux/Redux';
import { useState } from 'react';


export default function AdminStudentEdit() {

  let studentList = useSelector((state) => state.student?.student || []);
  
  const [userData, setUserData] = React.useState({
    name:studentList.name,
    email:studentList.email,
  })
  const [edit, setedit] = useState(false)
  const handleChange=(e)=>{
    setUserData(p=>({...p,[e.target.name]:e.target.value}))
  }
  let id = useParams()

  let dispatch=useDispatch()
  let header ={headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
  
  function handleForm(p) {
      p.preventDefault()
    if(edit){
      handleSubmit()
      return
    }
    handleAdd()
  }
  async function handleSubmit(p) {
    try {
      p.preventDefault()
      let obj={
        name:userData.name,
        email:userData.email
      }

      // let res = await fetch("http://localhost:8000/auth/register",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)})
      let res=await axios.put("http://localhost:8000/admin/putStudents",obj,header)
      if(res.status==204){
        enqueueSnackbar('Updated!!',{variant:'success'})
        dispatch(putStudents({...obj,id}))
        setUserData(p=>({
    name:'',
    email:'',
  }))
      }
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
      console.log(error.message);
    }    
  }
  async function handleAdd(p) {
    try {
      p.preventDefault()
      let obj={
        name:userData.name,
        email:userData.email
      }
      let res=await axios.post("http://localhost:8000/admin/postStudents",obj,header)
      if(res.status==201){
        enqueueSnackbar('Student Added!!',{variant:'success'})
        dispatch(putStudents(res.student))
        setUserData(p=>({
    name:'',
    email:'',
  }))
      }
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
      console.log(error.message);
    }    
  }
  const navigate = useNavigate()
  const location= useLocation()
  React.useEffect(() => {
    if(location.state){
      setEdit(p=>true)
      setUserData(p=>studentList.find((i)=>(i._id==id.id?true:false)))
      }
    }, [])
  

  
  return (
    <Box sx={{bgColor:"blue",position:'relative',py:5}}>
        <PrimaryButton onClick={navigate(-1)}><ArrowBigLeftIcon/>Back</PrimaryButton>
        <Box sx={{display:'flex', justifyContent:'center',width:'100vw',position:'relative',py:5}}>
          <SnackbarProvider/>
    <Box sx={{ display: 'flex', flexDirection:'column',boxShadow:1,backdropFilter:'blur(50px)',px:2 }} component={'form'} onSubmit={handleSubmit}>
        
        <FormControl fullWidth sx={{ m: 1}} >
          <InputLabel htmlFor={`n-input`} sx={{color:'black'}}>Name</InputLabel>
          <OutlinedInput sx={{color:'black'}}
            id={`n-input`}
            label="Name"
            value={userData.name}
            name='name'
            type='text'
            onChange={handleChange}
          />
        </FormControl>
        
        <FormControl fullWidth sx={{ m: 1}}>
          <InputLabel htmlFor={`e-input`} sx={{color:'black'}}>Email</InputLabel>
          <OutlinedInput
           sx={{color:'black'}}
            id={`e-input`}
            label="Email"
            type='email'
            value={userData.email}
            name='email'
                        onChange={handleChange}
          />
        </FormControl>
        {/* <FormControl fullWidth sx={{ m: 1 ,'& .MuiOutlinedInput-root':{backgroundColor:theme.palette.mode=='dark'?'#1b1b1d':'#f5f5f5'}, '&: hover':{backgroundColor:theme.palette.mode=='dark'?'#2a2a2c':'#e0e0e0',borderColor:'#f20000'}}} variant="outlined" >
          <InputLabel htmlFor={`-input`}></InputLabel>
          <OutlinedInput
            placeholder='Disabled'
            label="Role"
          />
        </FormControl> */}
        <PrimaryButton type='submit'>{edit?"Update":"Submit"}</PrimaryButton>
      
     {/* <CardShadow  sx={{width:'200px'}}/> */}
    </Box>
        </Box>
    </Box>
  )
}
