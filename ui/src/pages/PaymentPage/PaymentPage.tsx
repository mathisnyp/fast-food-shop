import React from "react"
import { Button, Separator } from "../../components/shared/components"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { placeOrder } from "../../store/actions/OrderActions"
import { useNavigate } from "react-router-dom"
import { CartArticleLines } from "../../views"
import {
  AddressContainer,
  ItemsContainer,
  OrderSummaryContainer,
  PayCard,
  PaymentContainer,
} from "./PaymentPageStyles"

export function PaymentPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.user.loggedInUser)
  const total = useAppSelector((state) => state.orders.checkoutTotal)

  const payNowFunction = async () => {
    const result = await dispatch(placeOrder())
    if (result.type === placeOrder.fulfilled.type) {
      navigate("/checkout/confirmation")
    }
  }

  return (
    <PaymentContainer>
      <Separator />
      <AddressContainer>
        <div>
          {user?.firstname} {user?.lastname}
        </div>
        <div>{user?.street}</div>
        <div>
          {user?.city}, {user?.postcode} {user?.country}
        </div>
      </AddressContainer>
      <Separator />
      <ItemsContainer>
        <CartArticleLines />
      </ItemsContainer>
      <Separator />
      <PayCard>
        <OrderSummaryContainer>
          <div>Order Summary</div>
          <div>Total: {total}€</div>
        </OrderSummaryContainer>
        <Separator />
        <Button
          onClick={payNowFunction}
          disabled={total === 0}
          colorVariant={"primary"}
        >
          Pay now!
        </Button>
      </PayCard>
    </PaymentContainer>
  )
}
