import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogClose,
  DialogContent,
  IconButton,
} from "../shared/components"
import { HashMap } from "../../shared/utils/HashMap"
import { MutableUserAttributesForm } from "../UserAttributesForms/MutableUserAttributesForm"
import {
  useEditProfileTextFieldStates,
  usePasswordStates,
} from "./EditProfileHooks"
import { editUserProfile } from "../../store/actions/UserActions"
import { ErrorMessage } from "../shared/styles/FormStyles"
import {
  EditProfileContainer,
  EditProfileFormContainer,
  PasswordsContainer,
} from "./EditProfileViewStyles"
import { IoMdClose } from "react-icons/io"
import { PasswordForms } from "../UserAttributesForms/PasswordForms"

const buttonStyle: HashMap<"sm" | "md"> = { "@initial": "sm", "@bp1": "md" }

export function EditProfileView() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user.loggedInUser)

  const {
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
    setDontShowCountryValidation,
    isCountryValid,
    countryInputRef,
    dontShowCountryValidation,
    onChangeCountry,
    resetUser,
    getProfileUpdate,
    phone,
    country,
    city,
    postcode,
    street,
    resetShowValidation,
  } = useEditProfileTextFieldStates(user!)
  const {
    onChangePassword,
    onChangeConfirmation,
    password,
    passwordConfirmation,
    isPasswordValid,
    confirmationValid,
    dontShowValidationValue,
    dontShowValidation,
    resetPassword,
  } = usePasswordStates()
  const [somethingWentWrong, setSomethingWentWrong] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const goIntoEditMode = () => {
    setIsInEditMode(true)
  }
  const closeEditMode = () => {
    setSomethingWentWrong(false)
    resetUser()
    setIsInEditMode(false)
    resetShowValidation()
  }
  const saveProfile = () => {
    const failValidation = () => {
      setSomethingWentWrong(true)
      setDontShowCountryValidation(false)
      setDontShowCityValidation(false)
      setDontShowStreetValidation(false)
      setDontShowPhoneValidation(false)
    }

    if (!isCountryValid) {
      failValidation()
      countryInputRef.current?.focus()
    } else if (!isPostcodeValid) {
      failValidation()
      postcodeInputRef.current?.focus()
    } else if (!isCityValid) {
      failValidation()
      cityInputRef.current?.focus()
    } else if (!isStreetValid) {
      failValidation()
      streetInputRef.current?.focus()
    } else if (!isPhoneValid) {
      failValidation()
      phoneInputRef.current?.focus()
    } else {
      setSomethingWentWrong(false)
      setIsInEditMode(false)
      dispatch(editUserProfile(getProfileUpdate()))
      resetShowValidation()
    }
  }
  const emptyPasswordCache = () => {
    resetPassword()
  }
  const savePassword = () => {
    dontShowValidation()
    if (isPasswordValid && passwordConfirmation) {
      dispatch(editUserProfile({ password: password }))
      setDialogOpen(false)
      emptyPasswordCache()
    }
  }

  const primaryButtonText = isInEditMode ? "Save" : "Edit"
  const primaryButtonAction = isInEditMode ? saveProfile : goIntoEditMode

  return (
    <EditProfileContainer>
      <EditProfileFormContainer>
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
          isPostcodeValid={
            !isInEditMode || isPostcodeValid || dontShowPostcodeValidation
          }
          isCityValid={!isInEditMode || isCityValid || dontShowCityValidation}
          isAddressValid={
            !isInEditMode || isStreetValid || dontShowStreetValidation
          }
          isPhoneValid={
            !isInEditMode || isPhoneValid || dontShowPhoneValidation
          }
          postcodeInputRef={postcodeInputRef}
          cityInputRef={cityInputRef}
          streetInputRef={streetInputRef}
          phoneInputRef={phoneInputRef}
          allReadOnly={!isInEditMode}
          country={country}
          countryInputRef={countryInputRef}
          isCountryValid={
            !isInEditMode || isCountryValid || dontShowCountryValidation
          }
          onChangeCountry={onChangeCountry}
          setDontShowCountryValidation={setDontShowCountryValidation}
        />
      </EditProfileFormContainer>
      <ButtonGroup>
        <Button
          colorVariant={"primary"}
          sizeVariant={buttonStyle}
          onClick={primaryButtonAction}
        >
          {primaryButtonText}
        </Button>
        {!isInEditMode && (
          <>
            <Button
              colorVariant={"secondary"}
              sizeVariant={buttonStyle}
              onClick={() => setDialogOpen(true)}
            >
              Change Password
            </Button>
            <Dialog open={dialogOpen}>
              <DialogContent>
                <DialogClose asChild>
                  <IconButton
                    sizeVariant={"sm"}
                    onClick={() => {
                      resetPassword()
                      setDialogOpen(false)
                    }}
                    style={{ marginLeft: "100%" }}
                  >
                    <IoMdClose />
                  </IconButton>
                </DialogClose>
                <PasswordsContainer>
                  <PasswordForms
                    initialPassword={password}
                    passwordConfirmation={passwordConfirmation}
                    onChangePassword={onChangePassword}
                    onChangePasswordConfirmation={onChangeConfirmation}
                    isInitialValid={dontShowValidationValue || isPasswordValid}
                    isConfirmationValid={
                      dontShowValidationValue || confirmationValid
                    }
                  />
                  <Button colorVariant={"primary"} onClick={savePassword}>
                    Save Password
                  </Button>
                </PasswordsContainer>
              </DialogContent>
            </Dialog>
          </>
        )}
        {isInEditMode && (
          <Button sizeVariant={buttonStyle} onClick={closeEditMode}>
            Cancel
          </Button>
        )}
      </ButtonGroup>
      {somethingWentWrong && (
        <ErrorMessage>
          Please make sure all fields are filled out correctly
        </ErrorMessage>
      )}
    </EditProfileContainer>
  )
}
