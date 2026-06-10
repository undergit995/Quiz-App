import React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  SnackbarContent,
  Stack,
} from "@mui/material";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { PrimaryButton } from "../../../../Components/styledComponents/Buttons";
import axios from "axios";

export default function ResetPassword() {
  const [userData, setUserData] = React.useState({
    email: "",
  });
  const handleChange = (e) => {
    setUserData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (p) => {
    p.preventDefault();
    let obj = {
      email: userData.email,
    };
    try {
      let res = await axios.post(
        "https://quiz-backend-cw2w.onrender.com/auth/resetpassword",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.status == 200) {
        enqueueSnackbar("Reset link is sent to your email", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
      console.log(error.message);
    }
  };

  return (
    <div>
      <Stack
        sx={{
          justifyContent: "center",
          width: "100vw",
          position: "relative",
          py: 5,
        }}
      >
        <SnackbarProvider />
        <Typography variant="h5" color="initial">
          Reset Password
        </Typography>
        <Box>
          <Box component={"form"} onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor={`e-input`}>Email</InputLabel>
              <OutlinedInput
                id={`e-input`}
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <PrimaryButton type="submit">Reset</PrimaryButton>
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
