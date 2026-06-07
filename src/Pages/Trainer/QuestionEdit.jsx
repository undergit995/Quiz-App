import { postQuestions } from "../../Redux/Redux";
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  List,
  ListItem,
  OutlinedInput,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";
import { useParams } from "react-router-dom";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function QuestionEdit() {
  let { id } = useParams();
  let header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  let question = useSelector((state) => state.trainer.questions);
  // let editQuiz = useSelector((state) => state.trainer.quiz);

  const [quiz, setQuiz] = useState(
    question.find((i) => {
      if (i._id == id) return i;
    }),
  );
  const handleChange = (e) => {
    setQuiz((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  async function editQuestion() {
    let obj = {
      question: quiz.question,
      options: [
        quiz.options[0],
        quiz.options[1],
        quiz.options[2],
        quiz.options[3],
      ],
      correctAnswer: quiz.correctAnswer,
    };
    try {
      let response = await axios.put(
        `http://localhost:8000/trainer/questions/${quiz._id}`,
        obj,
        header,
      );
      if (response.status == 200) {
        enqueueSnackbar("Question Updated", { variant: "success" });
        dispatch(postQuestions(obj));
      }
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  }

  //   getQuerry(){

  //   }
  useEffect(() => {
    setQuiz(question.find((i) => i._id == id));
  }, []);
  return (
    <Box>
      <Stack component={"form"} onSubmit={editQuestion}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
            Question
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`n-input`}
            value={quiz.question}
            label="Question"
            name="question"
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <Typography variant="h6" color="initial">
          Enter Options
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`Option A-input`} sx={{ color: "black" }}>
            Option A
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`Option A-input`}
            label="Option A"
            value={quiz.options[0]}
            name="OptionA"
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`Option B-input`} sx={{ color: "black" }}>
            Option B
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`Option B-input`}
            label="Option B"
            name="OptionB"
            value={quiz.options[1]}
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`Option C-input`} sx={{ color: "black" }}>
            Option C
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`Option C-input`}
            label="Option C"
            name="OptionC"
            value={quiz.options[2]}
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`d-input`} sx={{ color: "black" }}>
            Option D
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`d-input`}
            label="OptionD"
            name="OptionD"
            value={quiz.options[3]}
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
            Answer
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`n-input`}
            label="Answer"
            name="correctAnswer"
            type="text"
            value={quiz.correctAnswer}
            onChange={handleChange}
          />
        </FormControl>
        <PrimaryButton type="submit" sx={{ w: 100 }}>
          {"Update Question"}
        </PrimaryButton>
      </Stack>
      <SnackbarProvider />
    </Box>
  );
}
