import React from 'react'
import { LinkButton, PrimaryButton } from '../../Components/styledComponents/Buttons'
import { Box, MenuItem, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Home() {
  const theme=useTheme()
  return (
    <div style={{color:'',}}>
      <Box sx={{height:400,backgroundColor:'violet'}}>
        <Box sx={{height:800,width:443,bgcolor:'tomato',position:'absolute',left:-201,top:-100,zIndex:-9,transform:'rotate(18deg)'}}/>
      <Box sx={{display:'flex',width:'100vw',position:'relative',py:5,mt:10}}>
        <Box sx={{borderRadius:3,m:13,backgroundColor:theme.colorSchemes.light.palette.primary.main,width:443,p:4,transform:'rotate(18deg)'}}>
          <Typography variant="h5" color="initial">Tests</Typography>
          <Typography variant="h6" color="initial">Compete with your friends</Typography>
          <Typography variant="h5" color="initial">Test your skills now</Typography>
          <Typography variant="h5" color="initial">Practice makes perfect</Typography>

        </Box>
      </Box>
      </Box>
        <Box sx={{borderRadius:3}}>
          <Typography variant="h6" color="initial">Languages</Typography>
        </Box>
    </div>
  )
}
