import { Box, Typography } from '@mui/material'
import React from 'react'

export default function StudentHome() {
  return (
    <div>
      <Box sx={{display:'flex'}}>
        <Box  sx={{m:3 , borderRadius:3}}>
          <Typography variant="h4" color="initial">Javascript</Typography>
        </Box>

        <Box  sx={{m:3 , borderRadius:3}}>
          <Typography variant="h6" color="initial">
            Attempt quiz now
          </Typography>

        </Box>
      </Box>
    </div>
  )
}
