import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updatePrev } from "../../Redux/Redux";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

export default function QuestionLayout({ items, index, id }) {
  const [selected, setSelected] = useState(-1);

  const dispatch = useDispatch();

  const prevAnswer = useSelector((state) => state.sliceOnes.prevQuestion);

  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  //
  const result = async () => {
    try {
      const res = await axios.post(
        `https://quiz-backend-cw2w.onrender.com/student/quiz/storedAnswer/${localStorage.getItem(
          "attemptId",
        )}`,
        { quizId: id },
        header,
      );

      if (res?.data?.attempt) {
        dispatch(updatePrev(res.data.attempt));
      }
    } catch (error) {
      // enqueueSnackbar("Stored answers could not be loaded", {
      //   variant: "error",
      // });
    }
  };

  const stuAnswer = async (ind) => {
    setSelected(ind);

    try {
      await axios.post(
        `https://quiz-backend-cw2w.onrender.com/student/quiz/questionAttempt/${localStorage.getItem(
          "attemptId",
        )}`,
        {
          questionId: items?._id,
          quizId: id,
          answer: ind,
        },
        header,
      );

      result();
      // dispatch()
    } catch (error) {
      console.log(error.message);

      enqueueSnackbar("Server Error", {
        variant: "error",
      });
    }
  };

  let options = items?.options?.map((option, ind) => (
    <Grid item sm={3} size={6} key={ind}>
      <FormControl fullWidth>
        <RadioGroup
          value={selected}
          onChange={(e) => stuAnswer(Number(e.target.value))}
        >
          <Box
            sx={{
              border: "2px solid black",
              borderRadius: 2,
              backgroundColor: selected === ind ? "rgb(89,255,0)" : "white",
              cursor: "pointer",
              "&:hover": {
                border: "2px solid #000",
              },
            }}
          >
            <FormControlLabel
              sx={{
                maxWidth: "100px",
                m: 0,
                px: 1,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              key={uuid()}
              value={ind}
              control={<Radio />}
              label={option}
              sx={{
                width: "100%",
                m: 0,
                px: 1,
                py: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            />
          </Box>
        </RadioGroup>
      </FormControl>
    </Grid>
  ));

  useEffect(() => {
    let attemptId = localStorage.getItem("attemptId");

    if (!attemptId) return;
    result();
  }, []);

  useEffect(() => {
    if (!items?._id) return;

    const saved = prevAnswer?.find((q) => q.questionId === items._id);

    if (saved) {
      setSelected(Number(saved.answer));
    } else {
      setSelected(-1);
    }
  }, [items, prevAnswer]);

  return (
    <Box>
      <SnackbarProvider />
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
