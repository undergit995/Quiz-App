import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentNav from './StudentNav'

export default function StudentDashboard() {
  return (
    <div>
        <StudentNav/>
        <Outlet/>
    </div>
  )
}
