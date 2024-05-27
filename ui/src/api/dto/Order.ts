import { OrderPart as SendingOrderPart } from "../model"
import { MongoDbDto } from "./MongoDbDto"

export interface OrderPart extends MongoDbDto, SendingOrderPart {}

export type OrderArticles = OrderPart[]

export interface InternalOrderHistoryPart extends MongoDbDto {
  userId: string
  orderDate: string
  orderNr: number
}

export interface OrderHistoryPart extends InternalOrderHistoryPart {
  articles: OrderArticles
}

export type OrderHistory = OrderHistoryPart[]
