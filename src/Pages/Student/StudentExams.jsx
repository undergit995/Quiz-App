import React, { useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Box, Grid, LinearProgress } from '@mui/material'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import { getQuizOne } from '../../Redux/Redux'
import { PrimaryButton } from '../../Components/styledComponents/Buttons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function StudentExams() {

    let quizzes = useSelector((state) => state.sliceOnes.quizOne) || []
    
    const [err, setErr] = React.useState(false);
    let header ={headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
    let dispatch = useDispatch()
    const navigate = useNavigate()

    async function getAllQuiz(params) {
        try {            
            setErr(p=>true)
        let res = await axios.get('https://quiz-backend-cw2w.onrender.com/student/quiz',header)
        dispatch(getQuizOne(res.data.quiz)) 
        setErr(p=>false)
        } catch (error) {
            console.log(error.message);
            enqueueSnackbar('Server Error',{variant:'error'})            
        }
    }
    

    let quizzesList = quizzes?.map((i) =>{
        return(
            <Grid item size={3} sx={{borderRadius:3}} >
                <Box>
                    <Typography variant="h5" color="initial">{i.name}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6" color="initial">{i.desc}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6" color="initial">{i.duration}</Typography>
                </Box>
                <PrimaryButton  onClick={()=>{navigate(`/studentdashboard/quiz/code/${i._id}`); localStorage.setItem('quizId',i._id)}}>Start</PrimaryButton>
            </Grid>
        )
    })
    
    useEffect(() => {
        getAllQuiz()
        if(quizzes?.length<=0){ setErr(p=>true)}
  }, [])
        if(quizzes?.length<=0) return(
      <LinearProgress aria-label="Loading…" />)
  return (
    <Box>
        <SnackbarProvider/>
        <Box sx={{textAlign:'center',width:'100%'}}>
            <Typography variant="h3" color="initial" sx={{}}>Quiz</Typography>
        </Box>
        <Grid container spacing={2} sx={{m:3}}>
            {quizzesList}
        </Grid>
    </Box>
  )
}
