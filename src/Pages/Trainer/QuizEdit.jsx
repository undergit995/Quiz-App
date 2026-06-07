import { getQuizzes, updateQuizzes } from '../../Redux/Redux';
import { PrimaryButton } from '../../Components/styledComponents/Buttons';
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
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function QuizEdit() {
    let {id} = useParams()
    let editQuiz = useSelector((state) => state.trainer.quiz);
    let [quiz, setQuiz] = useState(editQuiz.find((i) => i._id == id));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleExam = (e) => {
        setQuiz((p) => ({ ...p, [e.target.name]: e.target.value }));
      };

    let header = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      async function handleCreate(){
        
        let obj = {
          name: quiz?.name,
          desc: quiz?.desc,
          code: quiz?.code,
      }
      try {
      let res = await axios.put(
        `http://localhost:8000/trainer/putquiz/${id}`,obj,
        header
      );
      console.log(res.data);
      if (res.status == 200){ dispatch(updateQuizzes(res.data.quiz))};
      enqueueSnackbar("Quiz Updated", { variant: "success" ,anchorOrigin:{vertical:'top',horizontal:'right'}});
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }  
    }

    //   useEffect(() => {
    //     setQuiz(editQuiz.find((i) => i._id == id));
    //   }
    //   , [])
  return (
    <Box>
        <SnackbarProvider />
        <Box sx={{}} component={"form"} onSubmit={handleCreate}>
            <PrimaryButton onClick={()=>(navigate(-1))}>Back</PrimaryButton>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
              Name
            </InputLabel>
            <OutlinedInput
              sx={{ color: "black" }}
              id={`n-input`}
              label="Name"
              name="name"
              value={quiz?.name}
              type="text"
              onChange={handleExam}
            />
          </FormControl>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
                Description
              </InputLabel>
              <OutlinedInput
                sx={{ color: "black" }}
                id={`n-input`}
                label="Description"
                name="desc"
                value={quiz?.desc}
                type="text"
                onChange={handleExam}
              />
            </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
              Code
            </InputLabel>
            <OutlinedInput
              sx={{ color: "black" }}
              id={`n-input`}
              label="Code"
              value={quiz?.code}
              name="code"
              type="text"
              onChange={handleExam}
            />
          </FormControl>
          <PrimaryButton type="submit">Update</PrimaryButton>
        </Box>
                
    </Box>
  )
}
