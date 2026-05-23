import React from 'react'
import TrainerNav from './TrainerNav'
import { Outlet } from 'react-router-dom'

export default function TrainerDashboard() {
  return (
    <div>
        <TrainerNav/>
        <Outlet/>
    </div>
  )
}
