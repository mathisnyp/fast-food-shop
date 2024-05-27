import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchOrdersByLoginToken } from "../../store/actions/OrderActions"
import { addPrices } from "../../shared/utils/MoneyUtils"
import { ArticleLine } from "../Article/Line/ArticleLine"
import {
  OrderArticlesContainer,
  OrdersContainer,
  OrderSummaryContainer,
  SingleOrderContainer,
} from "./OrderHistoryStyles"
import { Separator } from "../shared/components"

export function OrderHistory() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOrdersByLoginToken())
  }, [])

  const orderHistory = useAppSelector((state) => state.orders.orderHistory)

  const orders = orderHistory
    ?.map((eachOrder) => {
      let total = 0
      let articleDivs = eachOrder.articles.map((eachArticle, eachIndex) => {
        total = addPrices(eachArticle.totalPrice, total)
        return (
          <OrderArticlesContainer key={eachArticle._id}>
            <ArticleLine article={eachArticle} viewOnly={true} />
          </OrderArticlesContainer>
        )
      })
      return (
        <SingleOrderContainer key={eachOrder._id}>
          <OrderSummaryContainer>
            <span>Date: {eachOrder.orderDate}</span>
            <span>Total: {total}€</span>
          </OrderSummaryContainer>
          <Separator />
          {articleDivs}
        </SingleOrderContainer>
      )
    })
    .reverse()

  return <OrdersContainer>{orders}</OrdersContainer>
}
