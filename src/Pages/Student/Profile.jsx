import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";

export default function StudentProfile() {
  const [details, setDetails] = useState({});

  async function getProfile(params) {
    try {
      let res = await axios.get(
        `https://quiz-backend-cw2w.onrender.com/student/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      setDetails(res.data.student);
    } catch (error) {
      console.log(error.message);

      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <SnackbarProvider />
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography variant="h3" color="initial" sx={{}}>
          My Profile
        </Typography>
      </Box>
      <Grid container sx={{}}>
        <Grid item size={6}>
          {details?.name}
        </Grid>
        <Grid item size={6}>
          {details?.email}
        </Grid>
        <Grid item size={6}></Grid>
      </Grid>
    </Box>
  );
}