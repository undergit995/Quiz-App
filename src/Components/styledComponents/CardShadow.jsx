import React from 'react'
import Box from '@mui/material/Box';

export default function CardShadow() {
  return (
    <Box sx={{position:'absolute',right:0,bottom:0,boxShadow:'0px 0px 10px rgb(69, 66, 66)',borderRadius:'50%',p:2,backgroundColor:'#1b1b1d',height:'0%',display:{xs:'none',sm:'block'}}}>
        
    </Box>
  )
}
