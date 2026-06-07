import React from 'react'
import { Outlet } from 'react-router-dom'
import NavLayout from '../../Components/styledComponents/NavLayout'

export default function Dashboard() {
  return (
    <div>      
      <NavLayout/>
      <Outlet/>
    </div>
  )

}