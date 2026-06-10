import { Box, Button, TextField } from "@mui/material";
import React from "react";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import {
  LinkButton,
  PrimaryButton,
} from "../../Components/styledComponents/Buttons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const outlinedPasswordId = React.useId();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setUserData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();

  const formdata = new FormData();
  formdata.append("email", userData.email);
  formdata.append("password", userData.password);

  const handleSubmit = async (p) => {
    p.preventDefault();
    let obj = {
      email: userData.email,
      password: userData.password,
    };
    try {
      let res = await axios.post(
        "https://quiz-backend-cw2w.onrender.com/auth/login",
        obj,
        //   formdata,{headers:{
        //   'Content-Type':'multipart/form-data'
        // }}
      );
      let decoded = jwtDecode(res.data.token);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        if (decoded.role == "student") {
          navigate("/studentdashboard", { replace: true });
        } else if (decoded.role == "trainer") {
          navigate("/trainerdashboard", { replace: true });
        } else {
          navigate("/admindashboard", { replace: true });
        }
        enqueueSnackbar("Login Succesfull", {
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backdropFilter: "blur(50px)",
          position: "relative",
          py: 5,
        }}
      >
        <SnackbarProvider />
        <Box
          sx={{ display: "flex", flexDirection: "column", boxShadow: 1 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel sx={{ color: "black" }} htmlFor={`e-input`}>
              Email
            </InputLabel>
            <OutlinedInput
              sx={{ color: "black" }}
              id={`e-input`}
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
            <InputLabel
              sx={{ color: "black" }}
              htmlFor={`${outlinedPasswordId}-input`}
            >
              Password
            </InputLabel>
            <OutlinedInput
              sx={{ color: "black" }}
              id={`${outlinedPasswordId}-input`}
              name="password"
              label="Password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <PrimaryButton type="submit">Login</PrimaryButton>
            <LinkButton
              sx={{ width: "99px", height: "50px" }}
              onClick={() => navigate("/resetpassword")}
            >
              Reset Password ?
            </LinkButton>
          </Box>{" "}
        </Box>
      </Box>
    </Box>
  );
}
