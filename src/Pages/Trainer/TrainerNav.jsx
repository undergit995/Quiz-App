import PropTypes from "prop-types";
import Box from "@mui/material/Box";
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

const settings = ["Settings", "Logout"];

export default function TrainerNav() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
        height: "100vh",
        width: "20%",
        position: "static",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Tabs orientation="vertical" value={location.pathname}>
        <Tab
          label="Home"
          value="/trainerdashboard"
          to="/trainerdashboard"
          component={Link}
        />
        <Tab
          label="Quiz"
          value={"/trainerdashboard/quiz"||"/trainerdashboard/quiz/questions" ||"/trainerdashboard/quiz/result/:id" ||"/trainerdashboard/quiz/questions/update/:id" }
          to="/trainerdashboard/quiz"
          component={Link}
        />
        <Tab
          label="Profile"
          value="/trainerdashboard/profile"
          to="/trainerdashboard/profile"
          component={Link}
        />
      </Tabs>
      <Box sx={{}}>
        <Tooltip title="Profile">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorReference="anchorPosition"
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
