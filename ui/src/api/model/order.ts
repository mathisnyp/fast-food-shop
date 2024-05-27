import { Article } from "../dto"
import { InternalOrderHistoryPart } from "../dto/Order"

export interface OrderPart {
  quantity: number
  articleId: string
  price: number
}

export type Order = OrderPart[]

export interface ArticleQuantity extends Article {
  totalPrice: number
  selectedQuantity: number
}

export interface FetchedOrderHistoryPart extends InternalOrderHistoryPart {
  articles: ArticleQuantity[]
}

export type FetchedOrderHistory = FetchedOrderHistoryPart[]
