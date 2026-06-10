import React from 'react'
import Typography from '@mui/material/Typography'
import { SnackbarProvider } from 'notistack'
import { Box } from '@mui/material'

export default function StudentMembership() {
  return (
    <Box sx={{display:'flex',justifyContent:'center',flexDirection:'column', alignItems:'center', width:'100%'}}>
        <SnackbarProvider/>
        <Box>
        <Typography variant="h3" color="initial">Become a member now</Typography>
        </Box>
    </Box>
  )
}
