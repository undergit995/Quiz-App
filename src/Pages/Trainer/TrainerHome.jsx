import { Box, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

export default function TrainerHome() {
  return (
    <div>
      <Stack direction={'row'} sx={{}} justifyContent={'space-between'} spacing={2}>
        <Box sx={{boxShadow:'revert-layer',borderRadius:2,p:2,m:2}}>
          <Typography variant="h4" color="initial">Premium Membership</Typography>
          <Divider/>
        </Box>
        <Box sx={{boxShadow:'revert-layer',borderRadius:2,p:2,m:2}}>
          <Typography variant="h4" color="initial">Logo</Typography>
          <Typography variant="caption" color="initial">Create your next Quiz now</Typography>
          <Divider/>
          <Typography variant="body2" color="initial">Logo designs perfect quiz</Typography>
        </Box>
      </Stack>
      <Box sx={{boxShadow:'revert-layer',borderRadius:2,p:2,m:2}}>
        
      </Box>
    </div>
  )
}
