import {
  Box,
  Typography,
  Stack,
  TextField,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";
import InputField from "../../Components/Reusable Elements/InputField";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getQuizTest } from "../../Redux/Redux";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizCodeEnter() {
  const [code, setcode] = useState("");

  let id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      code: code,
    };
    try {
      let res = await axios.post(
        `https://quiz-backend-cw2w.onrender.com/student/quiz/code/${id}`,
        obj,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      dispatch(getQuizTest(res.data));
      navigate(`/student/quiz/info/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setcode(e.target.value);
  };
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      <SnackbarProvider />
      <Typography variant="h5" color="initial"></Typography>
      <Stack component={"form"} sx={{}} onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor={`e-input`} sx={{ color: "black" }}>
            {"Quiz Code"}
          </InputLabel>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`input`}
            name={`${code}`}
            type="text"
            label={`Quiz Code`}
            value={code}
            onChange={handleChange}
          />
        </FormControl>
        {/* <InputField name={'code'} label={'Enter Code'} */}
        <PrimaryButton type="submit" sx={{ m: "auto" }}>
          Send
        </PrimaryButton>
      </Stack>
    </Box>
  );
}
