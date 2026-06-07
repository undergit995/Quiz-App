import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, OutlinedInput, TextField } from "@mui/material";
import { getStu } from "../../Redux/ResultRedux.js";
import { SecondaryButton } from "../../Components/styledComponents/Buttons.js";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InputField from "../../Components/Reusable Elements/InputField.jsx";

function createData(name, email, score) {
  return {
    name,
    email,
    score,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.score}</TableCell>
        {/* <TableCell align="right">{row.duration}</TableCell> */}
        <TableCell align="right">
          <IconButton
            sx={{ color: "white" }}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Attempt Details
              </Typography>
              <Table size="small" aria-label="attempts">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Questions</TableCell>
                    <TableCell align="right">Duration</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((i) => (
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {/* {historyRow.date} */}
                      </TableCell>
                      {/* <TableCell>{historyRow.customerId}</TableCell> */}
                      {/* <TableCell align="right">{historyRow.amount}</TableCell> */}
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AllResult() {
  let { id } = useParams();
  let stu = useSelector((state) => state.feedback.student);
  const [name, setName] = useState("");

  const vertical = stu?.map((i, ind) => {
    console.log(String(i.createdAt).split('T')[1].replace('Z',''));

    return {
      name: i.userId.name,
      email: i.userId.email,
      score: i.score,
      attempt: [
        {
          duration: Math.trunc(
            // (i.createdAt).splice(11,9) - i.attemptId.createdAt.splice(11,9) / 1000,
          ),
        },
      ],
    };
  });
  let rows = vertical.filter((i) => {
    return (
      i.name.toLowerCase().includes(name.toLowerCase()) ||
      i.email.toLowerCase().includes(name.toLowerCase()) ||
      i.score.toString().includes(name.toLowerCase())
    );
  });
  console.log(rows);

  const dispatch = useDispatch();
  async function getResult(params) {
    try {
      let res = await axios.get(
        `http://localhost:8000/trainer/allResults/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      console.log(res.data);

      dispatch(getStu(res.data.results));
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }

  useEffect(() => {
    getResult();
  }, []);

  return (
    <Box sx={{ width: "100vw", mx: "auto" }}>
      <SnackbarProvider />
      <Box sx={{ m: 1,}}>
        <FormControl sx={{width:'50%'}} sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ color: "black" }}
            id={`n-input`}
            name="name"
            value={name}
            type="text"
            placeholder="Search name..."
            onChange={(e) => setName(e.target.value)}          
          />
        </FormControl>
        <Typography variant="h4" color="initial">
          {`${stu[0]?.quizId.name}`} Results
        </Typography>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, ind) => (
                <Row key={ind} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
