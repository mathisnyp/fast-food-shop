import { User } from "../../api/model/user"
import React, { useRef, useState } from "react"
import { ProfileUpdate } from "../../api/dto"
import {
  validateAddress,
  validateCity,
  validateCountry,
  validatePassword,
  validatePasswordConfirmation,
  validatePhoneNumber,
  validatePostcode,
} from "../../shared/utils/Validators"

export function useEditProfileStates(initialUser: User) {
  const [currentUser, setCurrentUser] = useState(initialUser)
  const resetUser = () => setCurrentUser(initialUser)

  const setPhone = (phone: string) => {
    setCurrentUser((prev) => {
      return { ...prev, phone: phone }
    })
  }
  const setCountry = (country: string) => {
    setCurrentUser((prev) => {
      return { ...prev, country: country }
    })
  }
  const setCity = (city: string) => {
    setCurrentUser((prev) => {
      return { ...prev, city: city }
    })
  }
  const setPostcode = (postcode: string) => {
    setCurrentUser((prev) => {
      return { ...prev, postcode: postcode }
    })
  }
  const setStreet = (street: string) => {
    setCurrentUser((prev) => {
      return { ...prev, street: street }
    })
  }

  const getProfileUpdate = () => {
    const update = {} as ProfileUpdate
    if (currentUser.phone !== initialUser.phone) {
      update.phone = currentUser.phone
    }
    if (currentUser.country !== initialUser.country) {
      update.country = currentUser.country
    }
    if (currentUser.city !== initialUser.city) {
      update.city = currentUser.city
    }
    if (currentUser.postcode !== initialUser.postcode) {
      update.postcode = currentUser.postcode
    }
    if (currentUser.phone !== initialUser.phone) {
      update.phone = currentUser.phone
    }
    return update
  }

  const { phone, country, city, postcode, street } = { ...currentUser }

  return {
    resetUser,
    phone,
    setPhone,
    country,
    setCountry,
    city,
    setCity,
    postcode,
    setPostcode,
    street,
    setStreet,
    getProfileUpdate,
  }
}

export function useEditProfileTextFieldStates(user: User) {
  const {
    resetUser,
    phone,
    setPhone,
    country,
    setCountry,
    city,
    setCity,
    postcode,
    setPostcode,
    street,
    setStreet,
    getProfileUpdate,
  } = useEditProfileStates(user)

  const [isInEditMode, setIsInEditMode] = useState(false)
  const [dontShowPostcodeValidation, setDontShowPostcodeValidation] =
    useState(true)
  const [isPostcodeValid, setIsPostcodeValid] = useState(false)
  const postcodeInputRef = useRef<HTMLInputElement>(null)
  const [dontShowPhoneValidation, setDontShowPhoneValidation] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const [dontShowCityValidation, setDontShowCityValidation] = useState(true)
  const [isCityValid, setIsCityValid] = useState(false)
  const cityInputRef = useRef<HTMLInputElement>(null)
  const [dontShowStreetValidation, setDontShowStreetValidation] = useState(true)
  const [isStreetValid, setIsStreetValid] = useState(false)
  const streetInputRef = useRef<HTMLInputElement>(null)
  const [dontShowCountryValidation, setDontShowCountryValidation] =
    useState(true)
  const [isCountryValid, setIsCountryValid] = useState(false)
  const countryInputRef = useRef<HTMLInputElement>(null)

  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localPostcode = event.target.value
    setPostcode(localPostcode)
    const isValid = validatePostcode(localPostcode)
    setIsPostcodeValid(isValid)
    if (isValid) setDontShowPostcodeValidation(true)
  }
  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localCity = event.target.value
    setCity(localCity)
    const isValid = validateCity(localCity)
    setIsCityValid(isValid)
    if (isValid) setDontShowCityValidation(true)
  }
  const onChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localAddress = event.target.value
    setStreet(localAddress)
    const isValid = validateAddress(localAddress)
    setIsStreetValid(isValid)
    if (isValid) setDontShowStreetValidation(true)
  }
  const onChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localPhone = event.target.value
    setPhone(localPhone)
    const isValid = validatePhoneNumber(localPhone)
    setIsPhoneValid(isValid)
    if (isValid) setDontShowPhoneValidation(true)
  }
  const onChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const localCountry = event.target.value
    setCountry(localCountry)
    const isValid = validateCountry(country)
    setIsCountryValid(isValid)
    if (isValid) setDontShowCountryValidation(true)
  }

  const resetShowValidation = () => {
    setDontShowCountryValidation(true)
    setDontShowPhoneValidation(true)
    setDontShowCityValidation(true)
    setDontShowPostcodeValidation(true)
    setDontShowStreetValidation(true)
  }

  return {
    isInEditMode,
    setIsInEditMode,
    dontShowPostcodeValidation,
    setDontShowPostcodeValidation,
    isPostcodeValid,
    onChangePostcode,
    dontShowPhoneValidation,
    setDontShowPhoneValidation,
    postcodeInputRef,
    isPhoneValid,
    onChangePhone,
    phoneInputRef,
    dontShowCityValidation,
    setDontShowCityValidation,
    isCityValid,
    onChangeCity,
    cityInputRef,
    dontShowStreetValidation,
    setDontShowStreetValidation,
    isStreetValid,
    onChangeAddress,
    streetInputRef,
    dontShowCountryValidation,
    setDontShowCountryValidation,
    isCountryValid,
    countryInputRef,
    onChangeCountry,
    resetUser,
    getProfileUpdate,
    phone,
    country,
    city,
    postcode,
    street,
    resetShowValidation,
  }
}

export function usePasswordStates() {
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [confirmationValid, setConfirmationValid] = useState(false)
  const [dontShowValidation, setDontShowValidation] = useState(true)

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setIsPasswordValid(validatePassword(value))
    setPassword(value)
  }

  const onChangeConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setConfirmationValid(validatePasswordConfirmation(value, password))
    setPasswordConfirmation(value)
  }

  const reset = () => {
    setPassword("")
    setPasswordConfirmation("")
    setIsPasswordValid(false)
    setConfirmationValid(false)
    setDontShowValidation(true)
  }

  return {
    onChangePassword,
    onChangeConfirmation,
    password,
    passwordConfirmation,
    isPasswordValid,
    confirmationValid,
    dontShowValidationValue: dontShowValidation,
    dontShowValidation: () => setDontShowValidation(false),
    resetPassword: reset,
  }
}
