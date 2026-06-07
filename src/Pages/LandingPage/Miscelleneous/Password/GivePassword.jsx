import React from 'react'
import PasswordField from '../../../../Components/styledComponents/Reusable Components/PasswordField'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import axios from 'axios'

export default function GivePassword() {
    
    const [userData, setUserData] = React.useState({
        password:'',
        cPassword:''
      })
      const handleChange=(e)=>{
        setUserData(p=>({...p,[e.target.name]:e.target.value}))
      }
      const handleSubmit=async(p)=>{
        p.preventDefault()
        let obj={
          password:userData.password
        }
        if(userData.password!=userData.cPassword){
            enqueueSnackbar('Password does not match',{variant:'error'});
            return;
        }
        let token = useParams().token
        try {
          let res=await axios.post("http://localhost:8000/auth/verifyPassword",obj,{headers:{
            Authorization:`Bearer ${token}`
          }})
          if(res.status==200){
            enqueueSnackbar('Password Changed Successfully',{variant:'success'})
            navigate('/login',{replace:true})
          }
        }
        catch (error) {
          enqueueSnackbar('Server Error',{variant:'error'})
          console.log(error.message);
        }
    }


    
  return (
    <div>
        <Box sx={{display:'flex', justifyContent:'center',width:'100vw',position:'relative',py:5}}>            
        <SnackbarProvider/>
        <Typography variant="h5" color="initial">Enter your new password</Typography>
        <Box>
            <Box component={'form'} onSubmit={handleSubmit}>
                <PasswordField name='password' label='Password' onChange={handleChange}/>
                <PasswordField name='cPassword' label='Confirm Password' onChange={handleChange}/>
                <PrimaryButton type='submit'>Change</PrimaryButton>
                
            </Box>
        </Box>
        </Box>

        
    </div>
  )
}

