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
import {PrimaryButton} from '../../Components/styledComponents/Buttons';
import { useTheme } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import CardShadow from '../../Components/styledComponents/CardShadow';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrainers, putTrainers } from '../../Redux/Redux';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export default function AdminTrainerEdit() {
  
  let trainerList = useSelector((state) => state.trainer.trainer);
  const [userData, setUserData] = useState({
    name:'',
    email:''
  })
  const [edit, setEdit] = useState(false)
  let id = useParams()

  const handleChange=(e)=>{
    setUserData(p=>({...p,[e.target.name]:e.target.value}))
  }
  let formdata = new FormData()
  // formdata.append('name',userData.name)
  // formdata.append('email',userData.email)
  // formdata.append('password',userData.password)

  const theme = useTheme()
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
      let obj={
        name:userData.name,
        email:userData.email
      }
      let res=await axios.put(`http://localhost:8000/admin/putTrainer/${id.id}`,obj,header)
      if(res.status==204){
        enqueueSnackbar('Updated!!',{variant:'success'})
        dispatch(putTrainers({...obj,id:id.id}))
        // navigate(1)
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
      let res=await axios.post("http://localhost:8000/admin/postTrainer",obj,header)
      if(res.status==201){
        enqueueSnackbar('Trainer Added!!',{variant:'success'})
        dispatch(putTrainers(res.trainer))
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
    if(id.id!=='add'){
      setEdit(p=>true)
      let data=trainerList.find((i)=>(i._id==id.id?true:false))
      if(data){
      setEdit(p=>true)
      setUserData(i=>trainerList.find((i)=>(i._id==id.id?true:false)))
      }
      console.log("ta",trainerList);
      }
    }, [id,trainerList])
    console.log(userData,id,"trainerList")
    console.log(edit,"trainerList")
  
  return (
    <Box sx={{bgColor:"blue",position:'relative',py:5}}>
        <PrimaryButton onClick={()=>{navigate(-1)}}><ArrowBackIosIcon fontSize='20'/>Back</PrimaryButton>
        <Box sx={{display:'flex', justifyContent:'center',width:'100vw',position:'relative',py:5}}>
          <SnackbarProvider/>
    <Box sx={{ display: 'flex', flexDirection:'column',boxShadow:1,backdropFilter:'blur(50px)',px:2 }} component={'form'} onSubmit={handleForm}>
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
        {/* <FormControl fullWidth sx={{ m: 1 ,'& .MuiOutlinedInput-root':{backgroundColor:theme.palette.mode=='dark'?'#1b1b1d':'#f5f5f5'}, '&: hover':{backgroundColor:theme.palette.mode=='dark'?'#2a2a2c':'#e0e0e0',borderColor:'#f20000'}}} >
          <InputLabel htmlFor={`-input`}></InputLabel>
          <OutlinedInput
            placeholder='Disabled'
            label="Role"
          />
        </FormControl> */}
        <PrimaryButton type='submit'>{edit?"Update":"Submit"}</PrimaryButton>
      
    </Box>
        </Box>
    </Box>
  )
}
