import PropTypes from "prop-types";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
  StaticRouter,
  useNavigate,
} from "react-router";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import { Box, Grid } from "@mui/material";
import { SecondaryButton } from "../../Components/styledComponents/Buttons";

export default function StudentNav() {
  const settings = ["Settings", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [placement, setPlacement] = React.useState();

  const handleOpenUserMenu = () => {
    setAnchorElUser("top-start");
    setPlacement("top-start");
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleCloseUserMenu = (i) => {
    if (settings.indexOf(i) == settings.length - 1) {
      localStorage.removeItem("token");
      navigate(`/login`, { replace: true });
    }
    setAnchorElUser(null);
  };
  React.useEffect(() => {}, []);

  return (
    <Stack
      sx={{
        width: 240,
        flexShrink: 0,
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box>
          <SecondaryButton
            onClick={() => {
              navigate(`/studentdashboard/home`);
            }}
            sx={{ width: "100%" }}
          >
            {"Home"}
          </SecondaryButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <SecondaryButton
            onClick={() => {
              navigate(`/studentdashboard/quiz/premium`);
            }}
            sx={{ width: "100%" }}
          >
            {"Membership"}
          </SecondaryButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <SecondaryButton
            onClick={() => {
              navigate(`/studentdashboard/quiz`);
            }}
            sx={{ width: "100%" }}
          >
            {"My Quiz"}
          </SecondaryButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <SecondaryButton
            onClick={() => {
              navigate(`/studentdashboard/profile`);
            }}
            sx={{ width: "100%" }}
          >
            {"Profile"}
          </SecondaryButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <SecondaryButton
            onClick={() => {
              navigate(`/studentdashboard`);
            }}
            sx={{ width: "100%" }}
          >
            {"Test Series"}
          </SecondaryButton>
        </Box>
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Tooltip title="Profile">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          placement={placement}
          transition
          anchorPosition={{ top: 528, left: 140 }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  );
}
