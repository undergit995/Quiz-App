import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from './AdminNav'

export default function AdminDashboard() {
  return (
    <div>
        <AdminNav/>
        <Outlet/>
    </div>
  )
}
