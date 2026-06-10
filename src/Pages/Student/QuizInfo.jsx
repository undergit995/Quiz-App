import { Box, Typography } from "@mui/material";
import React from "react";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";

export default function QuizInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  async function startQuiz(params) {
    try {
      let res = await axios.post(
        `https://quiz-backend-cw2w.onrender.com/student/quiz/attempt/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      // dispatch(getQuizTest(res.data))
      localStorage.setItem("attemptId", res.data.attempt, "quizId", id);
      navigate(`/student/quiz/test/${id}`);
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "200px",
          mx: "auto",
          boxShadow: "10px 10px gray",
          borderRadius: 2,
          p: 2,
        }}
      >
        <SnackbarProvider />
        <Typography variant="h5" color="initial">
          Ensure proper network before starting the quiz
        </Typography>
        <Typography variant="body2" color="initial">
          Each question carries 1 mark
        </Typography>
        <Typography variant="body2" color="initial">
          There's no negative marking
        </Typography>
        <PrimaryButton onClick={startQuiz}>Start</PrimaryButton>
      </Box>
    </Box>
  );
}
