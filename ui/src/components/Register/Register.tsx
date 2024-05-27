import React, { useState } from "react"
import { useRegisterStates } from "../../pages/AuthPage/Hooks"
import {
  validateAddress,
  validateCity,
  validateCountry,
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
  validatePhoneNumber,
  validatePostcode,
} from "../../shared/utils/Validators"
import { Button, Separator, TextField } from "../shared/components"
import { onChangeFormAttribute } from "../shared/utils/onChangeFormAttribute"
import { useAppDispatch } from "../../store/hooks"
import { register } from "../../store/actions/UserActions"
import { Register_data } from "../../api/model"
import {
  NavigationType,
  useNavigate,
  useNavigationType,
} from "react-router-dom"
import {
  RegisterContainer,
  RegisterTextFieldsContainer,
} from "./RegisterStyles"
import { ActionContainer } from "../shared/styles/AuthStyles"
import { PasswordForms } from "../UserAttributesForms/PasswordForms"
import { MutableUserAttributesForm } from "../UserAttributesForms/MutableUserAttributesForm"
import { ErrorMessage } from "../shared/styles/FormStyles"

function Register() {
  //States
  const [didSomethingGoWrong, setDidSomethingGoWrong] = useState(false)
  const [didRegisterActionFail, setDidRegisterActionFail] = useState(false);
  const {
    registeringEmail,
    setRegisteringEmail,
    isRegisteringEmailValid,
    setIsRegisteringEmailValid,
    dontShowRegisteringEmailValidation,
    setDontShowRegisteringEmailValidation,
    registeringEmailInputRef,
    initialPassword,
    setInitialPassword,
    isInitialPasswordValid,
    setIsInitialPasswordValid,
    dontShowInitialPasswordValidation,
    setDontShowInitialPasswordValidation,
    initialPasswordInputRef,
    passwordConfirmation,
    setPasswordConfirmation,
    isPasswordConfirmationValid,
    setIsPasswordConfirmationValid,
    dontShowPasswordConfirmationValidation,
    setDontShowPasswordConfirmationValidation,
    passwordConfirmationInputRef,
    firstName,
    setFirstName,
    isFirstNameValid,
    setIsFirstNameValid,
    dontShowFirstNameValidation,
    setDontShowFirstNameValidation,
    firstNameInputRef,
    lastName,
    setLastName,
    isLastNameValid,
    setIsLastNameValid,
    dontShowLastNameValidation,
    setDontShowLastNameValidation,
    lastNameInputRef,
    street,
    setStreet,
    isStreetValid,
    setIsStreetValid,
    dontShowStreetValidation,
    setDontShowStreetValidation,
    streetInputRef,
    postcode,
    setPostcode,
    isPostcodeValid,
    setIsPostcodeValid,
    dontShowPostcodeValidation,
    setDontShowPostcodeValidation,
    postcodeInputRef,
    city,
    setCity,
    isCityValid,
    setIsCityValid,
    dontShowCityValidation,
    setDontShowCityValidation,
    cityInputRef,
    country,
    setCountry,
    isCountryValid,
    setIsCountryValid,
    dontShowCountryValidation,
    setDontShowCountryValidation,
    countryInputRef,
    phone,
    setPhone,
    isPhoneValid,
    setIsPhoneValid,
    dontShowPhoneValidation,
    setDontShowPhoneValidation,
    phoneInputRef,
  } = useRegisterStates()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const navigationType = useNavigationType()

  //Change Functions
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setRegisteringEmail,
      validateEmail,
      setIsRegisteringEmailValid,
      setDontShowRegisteringEmailValidation
    )

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormAttribute(
      event,
      setInitialPassword,
      validatePassword,
      setIsInitialPasswordValid,
      setDontShowInitialPasswordValidation
    )
    if (dontShowPasswordConfirmationValidation) {
      const validationResult = validatePasswordConfirmation(
        event.target.value,
        passwordConfirmation
      )
      setIsPasswordConfirmationValid(validationResult)
      if (validationResult) {
        setDontShowPasswordConfirmationValidation(true)
      }
    }
  }

  const onChangePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) =>
    onChangeFormAttribute(
      event,
      setPasswordConfirmation,
      (value: string) => validatePasswordConfirmation(initialPassword, value),
      setIsPasswordConfirmationValid,
      setDontShowPasswordConfirmationValidation
    )

  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setFirstName,
      validateName,
      setIsFirstNameValid,
      setDontShowFirstNameValidation
    )

  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setLastName,
      validateName,
      setIsLastNameValid,
      setDontShowLastNameValidation
    )

  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setStreet,
      validateAddress,
      setIsStreetValid,
      setDontShowStreetValidation
    )

  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setPostcode,
      validatePostcode,
      setIsPostcodeValid,
      setDontShowPostcodeValidation
    )

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setCity,
      validateCity,
      setIsCityValid,
      setDontShowCityValidation
    )

  const onChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setCountry,
      validateCountry,
      setIsCountryValid,
      setDontShowCountryValidation
    )

  const onChangePhone = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormAttribute(
      event,
      setPhone,
      validatePhoneNumber,
      setIsPhoneValid,
      setDontShowPhoneValidation
    )
  const showAllValidation = () => {
    setDontShowFirstNameValidation(false)
    setDontShowLastNameValidation(false)
    setDontShowRegisteringEmailValidation(false)
    setDontShowInitialPasswordValidation(false)
    setDontShowPasswordConfirmationValidation(false)
    setDontShowCountryValidation(false)
    setDontShowPostcodeValidation(false)
    setDontShowCityValidation(false)
    setDontShowStreetValidation(false)
    setDontShowPhoneValidation(false)
  }
  const checkFailed = () => {
    setDidSomethingGoWrong(true)
    return false
  }
  const checkIfEverythingIsValid = () => {
    showAllValidation()
    if (!isFirstNameValid) {
      firstNameInputRef.current?.focus()
      return checkFailed()
    } else if (!isLastNameValid) {
      lastNameInputRef.current?.focus()
      return checkFailed()
    } else if (!isRegisteringEmailValid) {
      registeringEmailInputRef.current?.focus()
      return checkFailed()
    } else if (!isInitialPasswordValid) {
      initialPasswordInputRef.current?.focus()
      return checkFailed()
    } else if (!isPasswordConfirmationValid) {
      passwordConfirmationInputRef.current?.focus()
      return checkFailed()
    } else if (!isCountryValid) {
      countryInputRef.current?.focus()
      return checkFailed()
    } else if (!isPostcodeValid) {
      postcodeInputRef.current?.focus()
      return checkFailed()
    } else if (!isCityValid) {
      cityInputRef.current?.focus()
      return checkFailed()
    } else if (!isStreetValid) {
      streetInputRef.current?.focus()
      return checkFailed()
    } else if (!isPhoneValid) {
      phoneInputRef.current?.focus()
      return checkFailed()
    }
    setDidSomethingGoWrong(false)
    return true
  }
  const registerNow = async () => {
    if (checkIfEverythingIsValid()) {
      const userData: Register_data = {
        firstname: firstName,
        lastname: lastName,
        email: registeringEmail,
        password: passwordConfirmation,
        country: country,
        postcode: postcode,
        city: city,
        street: street,
        phone: phone,
      }
      const result = await dispatch(register(userData))
      if (result.type === register.fulfilled.type) {
        if (navigationType === NavigationType.Pop) {
          navigate("/")
        } else {
          navigate(-1)
        }
      } else {
        setDidSomethingGoWrong(true)
        setDidRegisterActionFail(true)
      }
    }
  }

  const errorMessageString = didRegisterActionFail ? "This E-Mail is already used for another account" : "Please make sure to fill out all fields with correct values!"

  return (
    <RegisterContainer>
      <RegisterTextFieldsContainer>
        <TextField
          value={firstName}
          label={"Name"}
          onChange={onChangeFirstName}
          onBlur={() => setDontShowFirstNameValidation(false)}
          isValid={isFirstNameValid || dontShowFirstNameValidation}
          inputRef={firstNameInputRef}
        />
        <TextField
          value={lastName}
          label={"Surname"}
          onChange={onChangeLastName}
          onBlur={() => setDontShowLastNameValidation(false)}
          isValid={isLastNameValid || dontShowLastNameValidation}
          inputRef={lastNameInputRef}
        />
        <TextField
          value={registeringEmail}
          label={"E-Mail"}
          onChange={onChangeEmail}
          onBlur={() => setDontShowRegisteringEmailValidation(false)}
          isValid={
            (isRegisteringEmailValid || dontShowRegisteringEmailValidation) && !didRegisterActionFail
          }
          inputRef={registeringEmailInputRef}
          helpText={"Must be in E-Mail format"}
        />
        <span style={{ width: 0, height: 0 }} />
        <PasswordForms
          initialPassword={initialPassword}
          passwordConfirmation={passwordConfirmation}
          onChangePassword={onChangePassword}
          onChangePasswordConfirmation={onChangePasswordConfirmation}
          setDontShowInitialPasswordValidation={
            setDontShowInitialPasswordValidation
          }
          setDontShowPasswordConfirmationValidation={
            setDontShowPasswordConfirmationValidation
          }
          isInitialValid={
            isInitialPasswordValid || dontShowInitialPasswordValidation
          }
          isConfirmationValid={
            isPasswordConfirmationValid || dontShowInitialPasswordValidation
          }
          initialInputRef={initialPasswordInputRef}
          confirmationInputRef={passwordConfirmationInputRef}
        />
        <MutableUserAttributesForm
          postcode={postcode}
          city={city}
          street={street}
          phone={phone}
          onChangePostcode={onChangePostcode}
          onChangeCity={onChangeCity}
          onChangeAddress={onChangeAddress}
          onChangePhone={onChangePhone}
          setDontShowPostcodeValidation={setDontShowPostcodeValidation}
          setDontShowCityValidation={setDontShowCityValidation}
          setDontShowStreetValidation={setDontShowStreetValidation}
          setDontShowPhoneValidation={setDontShowPhoneValidation}
          isPostcodeValid={isPostcodeValid || dontShowPostcodeValidation}
          isCityValid={isCityValid || dontShowCityValidation}
          isAddressValid={isStreetValid || dontShowStreetValidation}
          isPhoneValid={isPhoneValid || dontShowPhoneValidation}
          postcodeInputRef={postcodeInputRef}
          cityInputRef={cityInputRef}
          streetInputRef={streetInputRef}
          phoneInputRef={phoneInputRef}
          country={country}
          countryInputRef={countryInputRef}
          isCountryValid={isCountryValid || dontShowCountryValidation}
          onChangeCountry={onChangeCountry}
          setDontShowCountryValidation={setDontShowCountryValidation}
        />
      </RegisterTextFieldsContainer>
      <Separator style={{ marginBottom: "1em" }} />
      <ActionContainer>
        <Button onClick={registerNow} colorVariant={"primary"}>
          Register
        </Button>
        {didSomethingGoWrong && (
          <ErrorMessage>
            {errorMessageString}
          </ErrorMessage>
        )}
      </ActionContainer>
    </RegisterContainer>
  )
}

export default Register
