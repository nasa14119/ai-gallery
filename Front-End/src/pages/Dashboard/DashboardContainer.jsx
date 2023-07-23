import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { useAuth } from '../../context/auth.context'
import { NavPhone } from './components/NavPhone'

export const DashboardContainer = () => {
    const {ErrorElement} = useAuth()
  return (
    <>
    <Nav />
    <NavPhone/>
    <Outlet/> 
    <ErrorElement/> 
    </>
  )
}
