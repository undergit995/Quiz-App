import { Box, Grid, Typography } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import React, { useEffect } from 'react'

export default function StudentProfile() {

    async function getProfile(params) {
        
    }

    useEffect(() => {
      
    
      return () => {
        
      }
    }, [])
    
  return (
    <Box>
        <SnackbarProvider/>
        <Box sx={{textAlign:'center',width:'100%'}}>
            <Typography variant="h3" color="initial" sx={{}}>My Profile</Typography>
        </Box>
        <Grid container sx={{}}>
            
        </Grid>
    </Box>
  )
}
