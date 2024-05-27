import { createSlice } from "@reduxjs/toolkit"
import {
  addArticleToCart,
  fetchOrdersByLoginToken,
  modifyArticleInCart,
  placeOrder,
  removeArticleFromCart,
} from "../actions/OrderActions"
import { OrderPart } from "../../api/model"
import { Article } from "../../api/dto"
import { HashMap } from "../../shared/utils/HashMap"
import { isNil } from "lodash"
import {
  addPrices,
  multiplyPrice,
  subtractPrices,
} from "../../shared/utils/MoneyUtils"
import { FetchedOrderHistory } from "../../api/model/order"

export interface CartState {
  orderPart: OrderPart
  article: Article
}

interface OrderState {
  checkout: HashMap<CartState>
  checkoutTotal: number
  orderHistory: FetchedOrderHistory | undefined | null
}

const initialState: OrderState = {
  orderHistory: null,
  checkout: {},
  checkoutTotal: 0,
}

const OrderSlice = createSlice({
  name: "orders",
  initialState: initialState as OrderState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrdersByLoginToken.fulfilled, (state, action) => {
        return {
          ...state,
          orderHistory: action.payload,
        }
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        return {
          ...state,
          checkout: {},
          checkoutTotal: 0,
        }
      })
      .addCase(addArticleToCart, (state, action) => {
        const payload = action.payload
        let price = payload.price
        if (isNil(state.checkout[payload._id])) {
          const orderPart: OrderPart = {
            articleId: payload._id,
            quantity: 1,
            price: price,
          }
          state.checkout[payload._id] = {
            orderPart: orderPart,
            article: payload,
          }
        } else {
          const currentOrder = state.checkout[payload._id].orderPart
          const quantity = currentOrder.quantity + 1
          const singleItemPrice = state.checkout[payload._id].article.price
          price = multiplyPrice(singleItemPrice, quantity)
          state.checkout[payload._id].orderPart = {
            ...currentOrder,
            quantity: quantity,
            price: price,
          }
        }
        state.checkoutTotal = addPrices(price, state.checkoutTotal)
        return state
      })
      .addCase(removeArticleFromCart, (state, action) => {
        const price = state.checkout[action.payload].orderPart.price
        delete state.checkout[action.payload]
        state.checkoutTotal = subtractPrices(state.checkoutTotal, price)
        return state
      })
      .addCase(modifyArticleInCart, (state, action) => {
        const originalCartItem = state.checkout[action.payload.articleId]
        const oldPrice =
          state.checkout[action.payload.articleId].orderPart.price
        const newPrice = multiplyPrice(
          originalCartItem.article.price,
          action.payload.quantity
        )
        state.checkout[action.payload.articleId] = {
          ...originalCartItem,
          orderPart: {
            ...action.payload,
            price: newPrice,
          },
        }
        state.checkoutTotal = addPrices(
          subtractPrices(state.checkoutTotal, oldPrice),
          newPrice
        )
        return state
      }),
})

export const OrderReducer = OrderSlice.reducer
