import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TrainerProfile() {
  let trainer = useSelector((state) => state.trainer.trainer);

  const [details, setDetails] = useState({});

  async function getProfile(params) {
    try {
      let res = await axios.get(
        `https://quiz-backend-cw2w.onrender.com/student/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      console.log(res.data);
      setDetails(res.data.student);
    } catch (error) {
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
      <Grid container sx={{}}>
        <Grid item size={6}>
          {details?.name}
        </Grid>
        <Grid item size={6}>
          {details?.email}
        </Grid>
      </Grid>
    </Box>
  );
}
