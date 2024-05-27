import React from "react"
import { Button } from "../../components/shared/components"
import { useNavigate } from "react-router-dom"
import {
  ActionsContainer,
  ArrivalTextContainer,
  CheckMarkContainer,
  CheckMarkImage,
  OrderConfirmationPageContainer,
  ThankYouContainer,
} from "./OrderConfirmationPageStyles"

export function OrderConfirmationPage() {
  const navigate = useNavigate()

  return (
    <OrderConfirmationPageContainer>
      <ThankYouContainer>Thank you for your order! </ThankYouContainer>
      <CheckMarkContainer>
        <CheckMarkImage
          src={require("../../images/haken.png")}
          alt={"Failed to load image"}
        />
      </CheckMarkContainer>
      <ArrivalTextContainer>
        Your order should arrive at your destination in around one hour.
      </ArrivalTextContainer>
      <ActionsContainer>
        <Button onClick={() => navigate("/")}>Continue to homepage</Button>
      </ActionsContainer>
    </OrderConfirmationPageContainer>
  )
}
