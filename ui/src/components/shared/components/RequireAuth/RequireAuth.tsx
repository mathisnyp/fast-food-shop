import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { fetchUserByLoginToken } from "../../../../store/actions/UserActions"

interface PrivateRoutesProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: PrivateRoutesProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserByLoginToken()).then(() => {})
  }, [])

  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn)
  return <>{isUserLoggedIn ? children : <Navigate to="/login" />}</>
}
