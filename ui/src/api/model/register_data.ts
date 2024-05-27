import { Login_data } from "./login_data"

export interface Register_data extends Login_data {
  firstname: string
  lastname: string
  street: string
  postcode: string
  city: string
  country: string
  phone: string
}
