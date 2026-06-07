import { Box, Grid, TextField, Typography } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postPrev } from "../../Redux/Redux";

export default function QuestionLayout({ items, index, id }) {
  const [selected, setSelected] = useState(-1);
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  let prevAnswer = useSelector((state) => state.sliceOnes.prevQuestion);

  function prevAns(params) {
    prevAnswer.find((i, ind) => {
      if (i.questionId == items?._id) {
        setSelected(i.answer);
      }
    });
  }

  const stuAnswer = async (i, ind) => {
    setSelected(i);
    console.log(localStorage.getItem("attemptId"));

    try {
      let questionLayout = await axios.post(
        `http://localhost:8000/student/quiz/questionAttempt/${localStorage.getItem("attemptId")}`,
        { questionId: items?._id, quizId: id, answer: ind },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      dispatch(postPrev(questionLayout.data));
      console.log(questionLayout);
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  };

  let options = items?.options.map((i, ind) => {
    return (
      <Grid xs={6} size={6} key={ind}>
        <TextField type="radio" value={a}></TextField>
        <Box
          onClick={() => stuAnswer(i, ind)}
          variant="h6"
          color="initial"
          sx={{
            backgroundColor: selected == i ? "rgb(89, 255, 0)" : "white",
            borderRadius: 3,
            p: 1,
            cursor: "pointer",
            border: "2px solid black",
            "&:hover": {
              border: "2px solid rgb(0, 0, 0)",
              // color:'white'
            },
          }}
        >
          {i}
        </Box>
      </Grid>
    );
  });
  useEffect(() => {
    prevAns();
    console.log(prevAnswer);
  }, []);

  return (
    <Box>
      <SnackbarProvider/>
      <Grid container spacing={2} sx={{ m: 3 }}>
        <Grid item size={12}>
          <Grid container spacing={2}>
            <Grid item size={12} n sx={{}}>
              <Typography variant="h4" color="initial">
                {`${index + 1}.`}
                {items?.question}
              </Typography>
            </Grid>
            <Grid item size={12} sx={{}}>
              <Grid container spacing={2} sx={{}}>
                {options}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
