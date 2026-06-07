import { AppBar, useTheme } from '@mui/material'
import React from 'react'
import PrimaryButton  from '../../Components/styledComponents/Buttons'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
  const theme = useTheme()
  
  let navigate = useNavigate()

  return (
    <div>
      <AppBar/>
      <PrimaryButton onClick={()=>(navigate('/login'))}>Login</PrimaryButton>
    </div>
  )
}
