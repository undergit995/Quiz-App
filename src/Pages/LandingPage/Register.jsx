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
import {LinkButton, PrimaryButton, SecondaryButton} from '../../Components/styledComponents/Buttons';
import { Stack, useTheme } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import CardShadow from '../../Components/styledComponents/CardShadow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {

  const [userData, setUserData] = React.useState({
    name:'',
    email:'',
    password:'',
    cPassword:''
  })

  const handleChange=(e)=>{
    setUserData(p=>({...p,[e.target.name]:e.target.value}))
  }
  let formdata = new FormData()
  // formdata.append('name',userData.name)
  // formdata.append('email',userData.email)
  // formdata.append('password',userData.password)

  const outlinedStartId = React.useId();
  const outlinedWeightId = React.useId();
  const outlinedPasswordId = React.useId();
  const outlinedAmountId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showcPassword, setShowcPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowcPassword = () => setShowcPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDowncPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpcPassword = (event) => {
    event.preventDefault();
  };
  const theme = useTheme()
  const navigate = useNavigate()
  async function handleSubmit(p) {
    try {
      p.preventDefault()
      let obj={
        name:userData.name,
        email:userData.email,
        password:userData.password,
      }
      // let res = await fetch("http://localhost:8000/auth/register",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)})
      let res=await axios.post("https://quiz-backend-cw2w.onrender.com/auth/register",obj)
      if(res.status==204){
        enqueueSnackbar('Registered Succesfully',{variant:'success'})
        navigate('/login',{replace:true})
      }
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
      console.log(error.message);
    }    
  }
  
  return (
    <Box sx={{bgColor:"blue",position:'relative',py:5}}>
        <Box sx={{display:'flex', justifyContent:'center',width:'100vw',position:'relative',py:5}}>
          <SnackbarProvider/>
    <Box sx={{ display: 'flex', flexDirection:'column',boxShadow:1,backdropFilter:'blur(50px)',px:2 }} component={'form'} onSubmit={handleSubmit}>
        
        <FormControl fullWidth sx={{ m: 1}} >
          <InputLabel htmlFor={`n-input`} sx={{color:'black'}}>Name</InputLabel>
          <OutlinedInput sx={{color:'black'}}
            id={`n-input`}
            label="Name"
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
            name='email'
                        onChange={handleChange}
          />
        </FormControl>
        <FormControl  fullWidth sx={{ m: 1,  }} variant="outlined">
          <InputLabel htmlFor={`${outlinedPasswordId}-input`} sx={{color:'black'}}>Password</InputLabel>
          <OutlinedInput sx={{color:'black'}}
            id={`${outlinedPasswordId}-input`}
            name='password'
                        onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl  fullWidth sx={{ m: 1,  }} variant="outlined">
            
          <InputLabel  htmlFor={`c-input`} sx={{color:'black'}}>Confirm Password</InputLabel>
          <OutlinedInput
            sx={{color:'black',outline:"black"}}
            id={`c-input`}
                        onChange={handleChange}
            name='cPassword'
            type={showcPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showcPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowcPassword}
                  onMouseDown={handleMouseDowncPassword}
                  onMouseUp={handleMouseUpcPassword}
                  edge="end"
                >
                  {showcPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        {/* <FormControl fullWidth sx={{ m: 1 ,'& .MuiOutlinedInput-root':{backgroundColor:theme.palette.mode=='dark'?'#1b1b1d':'#f5f5f5'}, '&: hover':{backgroundColor:theme.palette.mode=='dark'?'#2a2a2c':'#e0e0e0',borderColor:'#f20000'}}} variant="outlined" >
          <InputLabel htmlFor={`-input`}></InputLabel>
          <OutlinedInput
            placeholder='Disabled'
            label="Role"
          />
        </FormControl> */}
        <Stack sx={{justifyContent:'space-between'}}>
        <SecondaryButton onClick={()=>navigate('/login')} sx={{height:29,width:200,textAlign:'center'}}>Already Registered? Login</SecondaryButton>
        <PrimaryButton type='submit' sx={{m:'auto',extAlign:'center'}}>Register</PrimaryButton>

        </Stack>
      
     {/* <CardShadow  sx={{width:'200px'}}/> */}
    </Box>
        </Box>
    </Box>
  )
}
