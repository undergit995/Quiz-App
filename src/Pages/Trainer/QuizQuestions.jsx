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
import React, { useEffect } from "react";
import { PrimaryButton } from "../../Components/styledComponents/Buttons";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { deleteQuestions, getQuestions, postQuestions, postQuiz } from "../../Redux/Redux";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";


export default function QuizQuestions() {
  const [quiz, setQuiz] = useState({
        question:'',
        OptionA:'',
        OptionB:'',
        OptionC:'',
        OptionD:'',
        correctAnswer:''
      });
  const [toggle, setToggle] = useState(false);
  let question = useSelector((state) => state.trainer.questions);

  const [arr, setArr] = useState([]);

  const handleChange = (e) => {
    setQuiz((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  let {id}= useParams()
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  let quizCode = useSelector((state) => state.trainer.quizCode);
  async function deleteQuestion(params) {
    try {
      await axios.delete(`http://localhost:8000/trainer/questions/${params}`,header)
      dispatch(deleteQuestions(params))
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
      console.log(error.message);
    }
    
  }
  
  const handleSubmit = async (p) => {
    p.preventDefault();
    let obj = {
      question: quiz.question,
      options: [quiz.OptionA, quiz.OptionB, quiz.OptionC, quiz.OptionD],
      correctAnswer: quiz.correctAnswer,
    };
    setArr((p) => [...arr, obj]);
    console.log("quiz", quiz);
    try {
      let res = await axios.post(`http://localhost:8000/trainer/questions/${id}`,obj,header)
      if(res.status==200){
        console.log(res.data.questions);
        
        enqueueSnackbar('Question Added',{variant:'success'})
      dispatch(postQuestions(res.data.questions));
      setQuiz(p=>({
        question:'',
        OptionA:'',
        OptionB:'',
        OptionC:'',
        OptionD:'',
        correctAnswer:''
      }))
      }
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  };

  function EditQuestion(params) {
    navigate(`/trainerdashboard/question/update/${params._id}`)
    if (params) {
      setToggle(true);
      (params);
      return;
    }
    
  }
  // async function EditQuestion(ind) {
  //   setQuiz(p=>({
  //     question:ind.question,
  //     OptionA:ind.optionA,
  //     OptionB:ind.optionB,
  //     OptionC:ind.optionC,
  //     OptionD:ind.optionD,
  //     correctAnswer:ind.correctAnswer
  //   }))
  //   setToggle(true);
  //   let obj = {
  //     question: quiz.question,
  //     options: [
  //       quiz.optionA,
  //       quiz.optionB,
  //       quiz.optionC,
  //       quiz.optionsD,
  //     ],
  //     correctAnswer: quiz.correctAnswer,
  //   };
  //   try {
  //     let response = await axios.put(`http://localhost:8000/trainer/questions/${ind._id}`,obj,header)
  //     if(response.status==200){
  //       enqueueSnackbar('Question Updated',{variant:'success'})
  //       dispatch(postQuestions(obj));
  //       setToggle(false);
  //       setQuiz(p=>({
  //       question:'',
  //       OptionA:'',
  //       OptionB:'',
  //       OptionC:'',
  //       OptionD:'',
  //       correctAnswer:''
  //     }))
  //     }
  //   } catch (error) {
  //     enqueueSnackbar("Server Error", { variant: "error" });
  //     console.log(error.message);
  //   }
  // }

  let formdata = new FormData();
  let questions = question.map((i, ind) => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{}}>
          <Typography variant="h4" color="initial">
            {i.question}
          </Typography>
        </Box>
        <Divider/>
        
        <List sx={{ width: "80%" }}>
          <ListItem variant="h6" color="initial">
            {i.options[0]}
          </ListItem>
          <ListItem  variant="h6" color="initial">
            {i.options[1]}
          </ListItem>
          <ListItem  variant="h6" color="initial">
            {i.options[2]}
          </ListItem>
          <ListItem  variant="h6" color="initial">
            {i.options[3]}
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Box component={"span"} variant="h6" color="initial">
            {"Correct Answer:"}
            {i.correctAnswer}
          </Box>
          <Box>
            <IconButton onClick={() => EditQuestion(i)}>
              <EditIcon color="black" />
            </IconButton>
            <IconButton onClick={() => deleteQuestion(i._id)}>
              <DeleteForeverIcon color="black" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
  });
  async function name(params) {
    try {
      let res = await axios.get(`http://localhost:8000/trainer/questions/${id}`, header);
      // console.log();
      
      if (res.status == 200) dispatch(getQuestions(res.data.questions));
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    name()
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          position: "relative",
          py: 5,
        }}
      >
        <SnackbarProvider />
{/*         
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: 1,
            backdropFilter: "blur(50px)",
            px: 2,
          }}
          component={"form"}
          onSubmit={handleCreate}
        >
          <Box sx={{}}></Box>
        </Box> */}
        
        <Stack component={"form"} onSubmit={handleSubmit}>
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
              value={quiz.OptionA}
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
              value={quiz.OptionB}
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
              value={quiz.OptionC}
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
              value={quiz.OptionD}
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
              value={quiz.currectAnswer}
              onChange={handleChange}
            />
          </FormControl>
          <PrimaryButton type="submit" sx={{w:100}}>{toggle ? 'Update Question' : 'Add Question'}</PrimaryButton>
        </Stack>
      </Box>
      <Box sx={{W:'80vw',m:'auto',boxShadow:1,backdropFilter:'blur(50px)',p:2,borderRadius:2}}>
      {questions}
        </Box>
    </div>
  );
}
