const emailRegex = /^.+@.+\..{2,3}$/
const addressRegex = /^.+ \d+([-/ ]\d+)?$/
const phoneNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ //This regex is copied from https://ihateregex.io/expr/phone/
const postcodeRegex = /^\d{5}$/

export function validateEmail(email: string): boolean {
  return email.match(emailRegex) !== null
}

export function validateName(name: string): boolean {
  return name.length > 1 && name[0].toUpperCase() == name[0]
}

export function validateAddress(address: string): boolean {
  return address.match(addressRegex) !== null
}

export function validateCity(city: string): boolean {
  return city.length > 1 && city[0].toUpperCase() == city[0]
}

export function validateCountry(country: string): boolean {
  return country.length > 1 && country[0].toUpperCase() == country[0]
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  return phoneNumber.match(phoneNumberRegex) !== null
}

export function validatePassword(password: string) {
  return password.length >= 16
}

export function validatePasswordConfirmation(
  password: string,
  passwordConfirmation: string
) {
  return password === passwordConfirmation
}

export function validatePostcode(postcode: string) {
  return postcode.match(postcodeRegex) !== null
}
