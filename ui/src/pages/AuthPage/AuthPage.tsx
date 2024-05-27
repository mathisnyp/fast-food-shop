import React, { useEffect, useState } from "react"
import { Login } from "../../components"
import Register from "../../components/Register/Register"
import { useAppSelector } from "../../store/hooks"
import { Navigate } from "react-router-dom"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/shared/components"
import { AuthPageContainer } from "./AuthPageStyles"

interface AuthPageProps {
  isUserSigningUp: boolean
}

export function AuthPage(props: AuthPageProps) {
  const [selectedTab, setSelectedTab] = useState("login")

  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn)

  useEffect(() => {
    const pageUrl = props.isUserSigningUp ? "register" : "login"
    setSelectedTab(pageUrl)
  }, [])

  const changeIsUserSingingUp = (value: string) => {
    const switchToLoginPage = value === "login"
    const newPageTitle = switchToLoginPage ? "Login" : "Register"
    const newPageUrl = switchToLoginPage ? "/login" : "/register"
    window.history.replaceState(null, newPageTitle, newPageUrl)
    setSelectedTab(value)
    return
  }

  return (
    <>
      {!isUserLoggedIn ? (
        <AuthPageContainer>
          <Tabs value={selectedTab} onValueChange={changeIsUserSingingUp}>
            <TabsList>
              <TabsTrigger value={"login"}>Login</TabsTrigger>
              <TabsTrigger value={"register"}>Register</TabsTrigger>
            </TabsList>
            <TabsContent value={"login"}>
              <Login />
            </TabsContent>
            <TabsContent value={"register"}>
              <Register />
            </TabsContent>
          </Tabs>
        </AuthPageContainer>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  )
}
