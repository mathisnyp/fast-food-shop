import axios from "../axios-url"
import { Login_data, Register_data } from "../model"
import { ProfileUpdate } from "../dto"
import { User } from "../model/user"
import { ArticleUserCorrelation } from "../dto/ArticleUserCorrelation"
import { OrderHistory } from "../dto/Order"

export const UserManagementClient = {
  register: async (registerData: Register_data) => {
    await axios.post("/signup", registerData)
  },
  login: async (loginData: Login_data) => {
    const response = await axios.post("/login", loginData)
  },
  logout: async () => {
    return await axios.post("logout")
  },
  getMyProfile: async () => {
    const response = await axios.get("profile")
    return response.data as User
  },
  editMyProfile: async (profileUpdate: ProfileUpdate) => {
    return await axios.post("profile/edit", profileUpdate).catch((err) => {
      console.info(
        "Failed to fetch profile, likely because no user is logged in"
      )
    })
  },
  getOrderHistory: async () => {
    const response = await axios.get("fastfood/orders")
    return response.data as OrderHistory
  },
  didUserBuyOrRateArticle: async (articleId: string) => {
    const response = await axios.get(
      `/fastfood/user-article-information/${articleId}`
    )
    return response.data as ArticleUserCorrelation
  },
}
