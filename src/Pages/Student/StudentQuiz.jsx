import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDuration, getQuizQuestions, getQuizzes } from "../../Redux/Redux";
import QuestionLayout from "./QuestionLayout";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import Duration from "./Duration";

export default function StudentQuiz() {
  const [quizList, setQuiz] = useState([]);
  const [first, setfirst] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);

  let { id } = useParams();
  let questions = useSelector((state) => state.sliceOnes.quizQuestions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  async function name() {
    try {
      let res = await axios.get(
        `http://localhost:8000/student/question/${id}`,
        header,
      );
      dispatch(getQuizQuestions(res.data.questions));
      dispatch(getDuration(res.data.duration))
      
    } catch (error) {
      // enqueueSnackbar('Server Error',{variant:'error',anchorOrigin:{vertical:'top',horizontal:'right'}})
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  let prev = () => {
    // if(currentIndex<= 0){
    //   setDisabled(true)
    //   return;
    // }
    setCurrentIndex(currentIndex - 1);
  };
  let next = () => {
    // if(currentIndex >= questions.length){
    //   setDisabled(true)
    //   return;
    // }
    setCurrentIndex(currentIndex + 1);
  };

  async function Submit(params) {
    try {
      let res = await axios.post(
        `http://localhost:8000/student/quiz/result/${localStorage.getItem(
          "attemptId"
        )}`,
        {},
          header
      );
      // dispatch(getResult())
      localStorage.removeItem('attemptId')
      console.log(res.data);
      navigate(`/studentdashboard/quiz/result`,{state:{result:res.data.result,quizId:id}});
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }

  function result(params) {
    // WITHOUT RE_
    setfirst((p) => params);
  }
  // let currentQuiz=quiz.

  // .sort(()=>Math.random()-0.5)
        let item=questions?.find((i, ind) => {
          if (ind == currentIndex) {
            return true;
          }
          return false;
        })

        console.log(item);
        
  let querry = questions.map((element, index) => {
    return (
      <Grid size={3} key={index}>
        <Box
          onClick={() => {
            setCurrentIndex(index);
            result(element);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{ backgroundColor: "gray", borderRadius: "50%", p: 1 }}
          >
            {index + 1}
          </Typography>
        </Box>
      </Grid>
    );
  });

  useEffect(() => {
    name();
    // setTimeout(() => {
    //   Submit();
    // }, 600000);
  }, []);
  return (
    <Grid container spacing={2} sx={{ m: 3 }}>
      <SnackbarProvider />
      <Grid size={9} sx={{}}>
        <Box><Duration Submit={Submit} id={id}/></Box>
        <Box>
          <QuestionLayout items={item} id={id} index={currentIndex} />
        </Box>
        <PrimaryButton
          onClick={prev}
          disabled={currentIndex <= 0 ? !disabled : disabled}
        >
          Previous
        </PrimaryButton>
        <PrimaryButton
          onClick={currentIndex >= questions.length - 1 ? Submit : next}
        >
          {currentIndex >= questions.length - 1 ? "Submit" : "next"}
        </PrimaryButton>
      </Grid>
      <Grid size={3}>
        <Grid container spacing={2} sx={{ m: 1 }}>
          {querry}
          <PrimaryButton onClick={Submit}>Submit</PrimaryButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
