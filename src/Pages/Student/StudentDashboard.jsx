import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNav from './StudentNav'
import { Box } from '@mui/material'

export default function StudentDashboard() {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <StudentNav />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflowY: "auto", width: "100%" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
