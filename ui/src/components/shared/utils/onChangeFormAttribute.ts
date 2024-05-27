import React from "react"

export function onChangeFormAttribute(
  event: React.ChangeEvent<HTMLInputElement>,
  attributeSetter: React.Dispatch<React.SetStateAction<string>>,
  validator: (value: string) => boolean,
  setValidationResult: React.Dispatch<React.SetStateAction<boolean>>,
  setDontShowValidation: React.Dispatch<React.SetStateAction<boolean>>
) {
  const value = event.target.value
  attributeSetter(value)
  const isAttributeValid = validator(value)
  setValidationResult(isAttributeValid)
  if (isAttributeValid) {
    setDontShowValidation(true)
  }
}
