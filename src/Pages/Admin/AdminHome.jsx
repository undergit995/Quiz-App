import React from 'react'
import { Box, Typography } from '@mui/material'


export default function AdminHome() {
  return (
    <Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h1'>Admin Space</Typography>
      
      <Box >
        <Typography variant="caption" color="initial"></Typography>
        
      </Box>

    </Box>

    </Box>
  )
}
