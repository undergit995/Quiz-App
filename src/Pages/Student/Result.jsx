import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Box, Grid, IconButton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getResult, getCurrentQuiz } from "../../Redux/ResultRedux";
import theme from "../../Theme/Theme";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";

export default function Result() {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  const [toggle,setToggle] = useState(false)
  async function score() {
    try {
      let res = await axios.get(
        `http://localhost:8000/student/quiz/result/${localStorage.getItem("quizId")}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      newFunction(res);
    } catch (error) {
      console.log(error.message);
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }
  function newFunction(res) {
    dispatch(getCurrentQuiz(res.data.quiz));
    dispatch(getResult(res.data.results));
  }
  let quizDetails = useSelector((state) => state.feedback.currentQuiz);
  let studentResult = useSelector((state) => state.feedback.resultOne);
  let resultLength =studentResult?.result?.length-1
  console.log(quizDetails,resultLength);
  console.log(studentResult);
  // if(studentResult){
  //     }
  // let displayResult = studentResult?.result?.map((i, ind) => { });
    
  let displayMyAnswer = studentResult?.solutions?.map((i, ind) => {
    return (
      <Box key={ind} sx={{ m: 1 }}>
        <Typography variant="h4" color="initial">
          {ind + 1}.{i.question}
        </Typography>
        <Stack>
          {<Box sx={{display:'flex'}}>
          <Typography variant="h6" color="initial" sx={{p:1}}>
            Your Answer : </Typography>
         <Typography variant="body1" color="initial" sx={{borderBottom:'1px solid black',p:1}}>
            {studentResult?.answers[resultLength]?.map((e, index) => {
              if (e.questionId == i._id) {
                return `${i.options[e.answer]}`;
              }
            })} 
            
          </Typography> 
          </Box>
          }
          {<Typography variant="body1" color="initial">
            {
              // if (index == studentResult?.answers[resultLength]?.map((j,index) => {
              //   if (j.questionId == i._id) {
              //     return j.answer;
              //      } })) {
              //   return `(Attempted) Your Answer : ${e} `;
              // }
              ` Correct Answer : ${i.options[i.correctAnswer]}`
           }
          </Typography>}
          {/* <Typography variant="body1" color="initial">
              {i.options[studentResult?.answers[studentResult.answers.length-1]?.map((e, index) => {
                if (e.questionId == i._id) {
                  return e.answer;                
              }})
              ]}
            </Typography> */}
        </Stack>
      </Box>
    );
  });
  let attemptPrev = 
  [1,2,3].map((k, indexes) => {
    return (
  studentResult?.solutions?.map((i, ind) => {
    return (
      <Grid item size={3}key={ind} sx={{ m: 1 }}>
        <Typography variant="h4" color="initial">
          {ind + 1}.{i.question}
        </Typography>
        <Stack>
          {<Box sx={{display:'flex'}}>
          <Typography variant="h6" color="initial" sx={{p:1}}>
            Your Answer : </Typography>
         <Typography variant="body1" color="initial" sx={{borderBottom:'1px solid black',p:1}}>
            {studentResult?.answers[indexes]?.map((e, index) => {
              if (e.questionId == i._id) {
                return `${i.options[e.answer]}`;
              }
            })} 
            
          </Typography> 
          </Box>
          }
          {<Typography variant="body1" color="initial">
            {
              // if (index == studentResult?.answers[resultLength]?.map((j,index) => {
              //   if (j.questionId == i._id) {
              //     return j.answer;
              //      } })) {
              //   return `(Attempted) Your Answer : ${e} `;
              // }
              ` Correct Answer : ${i.options[i.correctAnswer]}`
           }
          </Typography>}
          {/* <Typography variant="body1" color="initial">
              {i.options[studentResult?.answers[studentResult.answers.length-1]?.map((e, index) => {
                if (e.questionId == i._id) {
                  return e.answer;                
              }})
              ]}
            </Typography> */}
        </Stack>
      </Grid>
    );
  })
)
  })

  useEffect(() => {
    score();

    return () => {};
  }, []);

  return (
    <Box sx={{ w: "100vw", mx: "auto" }}>
      <SnackbarProvider />
      <Box>
        <Typography variant="h4" color="initial" sx={{textAlign:'center'}}>
          Feedback
        </Typography>
      </Box>
      <Box sx={{ mx: "auto" }}>
        <Typography variant="h5" color="initial">
          {quizDetails.name}
          
        </Typography>
        <Box>{ 
      <Box >
        <Typography variant="h5" color="initial">
          {`Your Score : ${resultLength && studentResult?.result[resultLength ]?.score}`}
        </Typography>
        <IconButton>
          <PrimaryButton onClick={() =>setToggle(p=>!p)}>History</PrimaryButton>
        </IconButton>
      </Box>
    }</Box>
    <Grid container spacing={2} sx={{m:3}}>
      <Grid item size={12}>
        <Box sx={{boxShadow:theme.shadows[3]}}>{toggle?'':displayMyAnswer}</Box>

      </Grid>

    </Grid>
      </Box>


      <Grid container>
        {toggle && attemptPrev}
      </Grid>
    </Box>
  );
}
