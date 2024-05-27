import React, { RefObject } from "react"
import { TextField } from "../shared/components"

interface PasswordFormsProps {
  initialPassword: string
  passwordConfirmation: string
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePasswordConfirmation: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
  setDontShowInitialPasswordValidation?: (value: boolean) => void
  setDontShowPasswordConfirmationValidation?: (value: boolean) => void
  isInitialValid: boolean
  isConfirmationValid: boolean
  initialInputRef?: RefObject<HTMLInputElement>
  confirmationInputRef?: RefObject<HTMLInputElement>
}

export function PasswordForms({
  initialPassword,
  passwordConfirmation,
  onChangePassword,
  setDontShowInitialPasswordValidation,
  setDontShowPasswordConfirmationValidation,
  isInitialValid,
  isConfirmationValid,
  initialInputRef,
  confirmationInputRef,
  onChangePasswordConfirmation,
}: PasswordFormsProps) {
  return (
    <>
      <TextField
        value={initialPassword}
        label={"Password"}
        type={"password"}
        onChange={onChangePassword}
        onBlur={() =>
          setDontShowInitialPasswordValidation
            ? setDontShowInitialPasswordValidation(false)
            : () => {}
        }
        isValid={isInitialValid}
        inputRef={initialInputRef}
        helpText={"Must be 16 characters long"}
      />
      <TextField
        value={passwordConfirmation}
        label={"Confirm Password"}
        type={"password"}
        onChange={onChangePasswordConfirmation}
        onBlur={() =>
          setDontShowPasswordConfirmationValidation
            ? setDontShowPasswordConfirmationValidation(false)
            : () => {}
        }
        isValid={isConfirmationValid}
        inputRef={confirmationInputRef}
        helpText={"Must match password"}
      />
    </>
  )
}
