import React, { useEffect, useState } from "react"
import { useAuthStates } from "../../pages/AuthPage/Hooks"
import { Button, Separator, TextField } from "../shared/components"
import { useAppDispatch } from "../../store/hooks"
import { fetchUserByLoginToken, login } from "../../store/actions/UserActions"
import { Login_data } from "../../api/model"
import {
  NavigationType,
  useNavigate,
  useNavigationType,
} from "react-router-dom"
import { AiOutlineMail } from "react-icons/ai"
import { LoginContainer, LoginTextFieldsContainer } from "./LoginStyles"
import { ActionContainer } from "../shared/styles/AuthStyles"
import { ErrorMessage } from "../shared/styles/FormStyles"

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [isSomethingWrong, setIsSomethingWrong] = useState(false)
  const {
    email,
    setEmail,
    isEmailValid,
    setIsEmailValid,
    password,
    setPassword,
    isPasswordValid,
    setIsPasswordValid,
  } = useAuthStates()
  useEffect(() => {
    setIsEmailValid(true)
    setIsPasswordValid(true)
  }, [])

  const navigationType = useNavigationType()

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setEmail(value)
    setIsEmailValid(true)
  }
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    setIsPasswordValid(true)
  }
  const onLoginNow = async () => {
    const loginData: Login_data = { email: email, password: password }
    const dispatchResult = await dispatch(login(loginData))
    if (dispatchResult.type === login.rejected.type) {
      setIsPasswordValid(false)
      setIsEmailValid(false)
      setIsSomethingWrong(true)
    } else {
      setIsSomethingWrong(false)
      await dispatch(fetchUserByLoginToken())
      if (navigationType === NavigationType.Pop) {
        navigate("/")
      } else {
        navigate(-1)
      }
    }
  }

  return (
    <LoginContainer>
      <LoginTextFieldsContainer>
        <TextField
          startFieldIcon={<AiOutlineMail />}
          value={email}
          label={"E-Mail"}
          onChange={onChangeEmail}
          isValid={isEmailValid}
        />
        <TextField
          value={password}
          type={"password"}
          label={"Password"}
          onChange={onChangePassword}
          isValid={isPasswordValid}
        />
      </LoginTextFieldsContainer>
      <Separator />
      <ActionContainer>
        <Button onClick={onLoginNow} colorVariant={"primary"}>
          Login now
        </Button>
        {isSomethingWrong && (
          <ErrorMessage>Wrong E-Mail or Password</ErrorMessage>
        )}
      </ActionContainer>
    </LoginContainer>
  )
}
