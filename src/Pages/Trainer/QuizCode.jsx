import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton, SecondaryButton } from "../../Components/styledComponents/Buttons";
import {  deleteQuizzes, getQuizzes, postQuiz, postQuizCode, putQuizzes } from "../../Redux/Redux";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CustomTable from "../../Components/styledComponents/Reusable Components/Table";

export default function QuizCode({ changeEdit }) {
  const [exam, setExam] = useState({});
  const [toggle, settoggle] = useState(false)
  const [isPublish, setIsPublish] = useState(Boolean)


  const handleExam = (e) => {
    setExam((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  let token = localStorage.getItem("token");
  let header = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function editQuiz(e){
    // settoggle(true)
    // setExam(p=>({
    //   name:e.name,
    //   desc:e.desc,
    //   code:e.code
    // }))

    navigate(`/trainerdashboard/quiz/update/${e.id}`)
  }
  function handleSubmit(e){
    e.preventDefault()
    if(toggle){
      settoggle(true)
      putQuiz(e)    
      return
    }
    handleCreate()
  }
  let allQuiz = useSelector((state) => state.trainer.quiz);

  async function putQuiz(params) {
    // if (!quiz) {
    // }
    let obj = {
      name: exam.name,
      desc: exam.desc,
      code: exam.code,
    };
    try {
      let res = await axios.put(
        `http://localhost:8000/trainer/putQuiz/${params}`,
        obj,
        header,
      );
      if (res.status == 200) {
        enqueueSnackbar("Quiz Created", {
          variant: "Success",
          anchorOrigin: { vertical: "top", horizontal: "right" }
        });
        // dispatch(putQuizz(res.data.quiz));
        setExam(p=>({
          name:'',
          desc:'',
          code:''
        }))
      }
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  }
  async function handleCreate(params) {
    // if (!quiz) {
    // }
    params.preventDefault();
    let obj = {
      name: exam.name,
      desc: exam.desc,
      code: exam.code,
    };
    try {
      let res = await axios.post(
        "http://localhost:8000/trainer/quiz",
        obj,
        header,
      );
      if (res.status == 200) {
        enqueueSnackbar("Quiz Created", {
          variant: "Success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        dispatch(postQuiz(res.data.quiz));
        setExam(p=>({
          name:'',
          desc:'',
          code:''
        }))
      }
      // changeEdit()
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  }
  async function deleteQuiz(params) {
    try {
      await axios.delete(`http://localhost:8000/trainer/quiz/${params}`,header)
      dispatch(deleteQuizzes(params))
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
      console.log(error.message);
    }    
  }

  async function getQuiz(params) {
    try {
      let res = await axios.get(
        `http://localhost:8000/trainer/quiz`,
        header,
      );
      console.log(res.data);
      if (res.status == 200){ dispatch(getQuizzes(res.data.quiz))};
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "desc",
      label: "Descripton",
      minWidth: 170
    },
    {
      id: "code",
      label: "Code",
      minWidth: 150,
    },
    {
      id: "questions",
      label: "No.of Questions",
      minWidth: 150,
    },
  ];

  const rows = allQuiz.map((i) => ({
    id: i._id,
    name: i.name,
    desc: i.desc,
    code: i.code,
    questions: i.questions,
    isPublished:i.isPublished
  }));

  
  async function deploy(params) {
    try {
      let res = await axios.put(`http://localhost:8000/trainer/quiz/${params.id}`,{isPublished : !params.isPublished},header);
      enqueueSnackbar(`Quiz ${ params.isPublished? 'UnPublished':'Published'}`,{variant:'success'});
      dispatch(putQuizzes({id:params.id,isPublished:!params.isPublished}))
    } catch (error) {
      enqueueSnackbar('Server Error',{variant:'error'})
    }
  }
  useEffect(() => {
    getQuiz();
  }, []);
  console.log(allQuiz);

  return (
    <div>
      <Box>
        <SnackbarProvider />
        <Box sx={{}} component={"form"} onSubmit={handleCreate}>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor={`n-input`} sx={{ color: "black" }}>
              Name
            </InputLabel>
            <OutlinedInput
              sx={{ color: "black" }}
              id={`n-input`}
              label="Name"
              name="name"
              value={exam.name}
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
                value={exam.desc}
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
              value={exam.code}
              name="code"
              type="text"
              onChange={handleExam}
            />
          </FormControl>
          <PrimaryButton type="submit">{toggle?'Update':'Create'}</PrimaryButton>
        </Box>
      </Box>
      <CustomTable
        rows={rows}
        columns={columns}
          publish = {(rows)=>{
            return(
              <SecondaryButton
                onClick={() => deploy(rows)}>{rows.isPublished? 'UnPublish':'Publish'}</SecondaryButton>
            )}}
            open={(rows)=>{
              return(
            <IconButton sx={{color:'white'}} 
              onClick={() =>
                
                navigate(`/trainerdashboard/quiz/questions/${rows.id}`)
              }
            >
              Open
            </IconButton>
              )
            }}
        actions={(rows) =>{
          return (
          <>          
            <IconButton >
              <EditIcon sx={{color:'white'}}  onClick={() => editQuiz(rows)}/>
            </IconButton>
            <IconButton  onClick={() => deleteQuiz(rows.id)}>
              <DeleteForeverIcon sx={{color:'white'}}  />
            </IconButton>
           </>
        )}}
        view={(rows)=>{
          return(
            <SecondaryButton onClick={()=>navigate(`/trainerdashboard/quiz/result/${rows.id}`)} >View</SecondaryButton>
          )
        }}

      />
    </div>
  );
}
