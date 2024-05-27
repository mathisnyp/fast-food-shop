import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { OrderPart } from "../../api/model"
import { UserManagementClient } from "../../api/Client/UserManagementClient"
import { ShoppingClient } from "../../api/Client/ShoppingClient"
import { RootState } from "../../index"
import { Article } from "../../api/dto"
import { CartState } from "../reducers/OrderReducer"
import {
  FetchedOrderHistory,
  FetchedOrderHistoryPart,
} from "../../api/model/order"
import { ExploringClient } from "../../api/Client/ExploringClient"

export const fetchOrdersByLoginToken: any = createAsyncThunk<
  FetchedOrderHistory,
  void,
  { state: RootState }
>("orders/fetchOrdersByLoginToken", async (arg, thunkAPI) => {
  const result = await UserManagementClient.getOrderHistory()
  const mappedResult = result.map(async (eachResult) => {
    const articlePromises = eachResult.articles.map(async (eachArticle) => {
      const article = await ExploringClient.getArticleById(
        eachArticle.articleId
      )
      return {
        ...article,
        selectedQuantity: eachArticle.quantity,
        totalPrice: eachArticle.price,
      }
    })
    const articles = await Promise.all(articlePromises)
    return {
      ...eachResult,
      articles: articles,
    } as FetchedOrderHistoryPart
  })
  return (await Promise.all(mappedResult)) as FetchedOrderHistory
})

export const placeOrder: any = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("orders/placeOrder", async (arg, thunkAPI) => {
  const currentCartState = Object.values<CartState>(
    thunkAPI.getState().orders.checkout
  )
  const order = currentCartState.map((eachCartItem) => {
    return eachCartItem.orderPart
  })
  if (order && order.length > 0) {
    await ShoppingClient.takeOrder(order)
    await thunkAPI.dispatch(fetchOrdersByLoginToken())
  }
})

export const addArticleToCart = createAction<Article>("orders/addArticleToCart")
export const removeArticleFromCart = createAction<string>(
  "orders/removeArticleFromCart"
)
export const modifyArticleInCart = createAction<OrderPart>(
  "orders/modifyArticleInCart"
)
