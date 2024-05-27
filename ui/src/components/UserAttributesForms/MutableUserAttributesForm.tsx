import React, { RefObject } from "react"
import { TextField } from "../shared/components"

interface MutableUserAttributesFormProps {
  postcode: string
  city: string
  street: string
  phone: string
  country: string
  onChangePostcode: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCity: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeAddress: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangePhone: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeCountry: (event: React.ChangeEvent<HTMLInputElement>) => void
  setDontShowPostcodeValidation: (value: boolean) => void
  setDontShowCityValidation: (value: boolean) => void
  setDontShowStreetValidation: (value: boolean) => void
  setDontShowPhoneValidation: (value: boolean) => void
  setDontShowCountryValidation: (value: boolean) => void
  isPostcodeValid: boolean
  isCityValid: boolean
  isAddressValid: boolean
  isPhoneValid: boolean
  isCountryValid: boolean
  postcodeInputRef: RefObject<HTMLInputElement>
  cityInputRef: RefObject<HTMLInputElement>
  streetInputRef: RefObject<HTMLInputElement>
  phoneInputRef: RefObject<HTMLInputElement>
  countryInputRef: RefObject<HTMLInputElement>
  allReadOnly?: boolean
}

export function MutableUserAttributesForm(
  props: MutableUserAttributesFormProps
) {
  return (
    <>
      <TextField
        value={props.country}
        label={"Country"}
        onChange={props.onChangeCountry}
        onBlur={() => props.setDontShowCountryValidation(false)}
        isValid={props.isCountryValid}
        inputRef={props.countryInputRef}
        readonly={props.allReadOnly}
      />
      <span style={{ width: 0, height: 0 }} />
      <TextField
        value={props.postcode}
        label={"Postcode"}
        onChange={props.onChangePostcode}
        onBlur={() => props.setDontShowPostcodeValidation(false)}
        isValid={props.isPostcodeValid}
        inputRef={props.postcodeInputRef}
        helpText={"Five digit long postcode"}
        readonly={props.allReadOnly}
      />
      <TextField
        value={props.city}
        label={"City"}
        onChange={props.onChangeCity}
        onBlur={() => props.setDontShowCityValidation(false)}
        isValid={props.isCityValid}
        inputRef={props.cityInputRef}
        readonly={props.allReadOnly}
      />
      <TextField
        value={props.street}
        label={"Address"}
        onChange={props.onChangeAddress}
        onBlur={() => props.setDontShowStreetValidation(false)}
        isValid={props.isAddressValid}
        inputRef={props.streetInputRef}
        helpText={"Must include street and number"}
        readonly={props.allReadOnly}
      />
      <span style={{ width: 0, height: 0 }} />
      <TextField
        value={props.phone}
        label={"Phone"}
        onChange={props.onChangePhone}
        onBlur={() => props.setDontShowPhoneValidation(false)}
        isValid={props.isPhoneValid}
        inputRef={props.phoneInputRef}
        helpText={"Global phone number scheme"}
        readonly={props.allReadOnly}
      />
    </>
  )
}
