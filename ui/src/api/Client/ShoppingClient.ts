import axios from "../axios-url"
import { Comment, Order, Rating } from "../model"

export const ShoppingClient = {
  takeOrder: async (order: Order) => {
    return await axios.post("/fastfood/order", order)
  },
  postComment: async (comment: Comment) => {
    return await axios.post("/fastfood/comment", comment)
  },
  rateArticle: async (rating: Rating) => {
    return await axios.post("/fastfood/rate", rating)
  },
}
