import React from "react"
import { useAppDispatch } from "../../store/hooks"
import { logout } from "../../store/actions/UserActions"
import { Navigate } from "react-router-dom"

export function Logout() {
  const dispatch = useAppDispatch()
  const initiateLogout = async () => {
    dispatch(logout())
  }
  initiateLogout().then(() => {
    console.info("Logged out successfully 🔒")
  })
  return <Navigate to={"/"} />
}
