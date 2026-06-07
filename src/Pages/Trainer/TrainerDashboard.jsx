import React from 'react'
import TrainerNav from './TrainerNav'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

export default function TrainerDashboard() {

  return (
    <Box sx={{display:'flex',width:'100vw',height:'100vh' }}>
        <TrainerNav  />
        <Outlet />
    </Box>
  )
}
