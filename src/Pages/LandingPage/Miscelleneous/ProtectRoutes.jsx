import { jwtDecode } from 'jwt-decode'
import React, { useEffect } from 'react'
import { replace, useNavigate } from 'react-router-dom'

export default function ProtectRoutes({children,role}) {
    let navigate = useNavigate()
    let token =localStorage.getItem('token')
    useEffect(() => {
    let decodeRole = jwtDecode(token)
    if(decodeRole.role!=role){
      navigate('/login',{replace:true})
      localStorage.clearItem('token')
      return;
      }
    }, [])
    
  return children
}
