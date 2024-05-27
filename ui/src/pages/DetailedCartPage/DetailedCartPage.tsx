import React, { useMemo } from "react"
import { useAppSelector } from "../../store/hooks"
import { Button, Separator } from "../../components/shared/components"
import { useNavigate } from "react-router-dom"
import { CartArticleLines } from "../../views"
import { CartEmptyWarning } from "../../components/Cart/CartEmptyWarning/CartEmptyWarning"
import { CartContainer, OverviewContainer } from "./DetailedCartPageStyles"

export function DetailedCartPage() {
  const navigate = useNavigate()

  const cartContent = useAppSelector((state) =>
    Object.values(state.orders.checkout)
  )
  const total: number = useAppSelector((state) => state.orders.checkoutTotal)

  const numberOfArticles = useMemo(() => {
    return cartContent.reduce((sum, currentCartStateIndex) => {
      return sum + currentCartStateIndex.orderPart.quantity
    }, 0)
  }, [cartContent])

  const proceedToPayment = () => {
    navigate("/checkout/pay")
  }

  return (
    <CartContainer>
      {numberOfArticles > 0 ? <CartArticleLines /> : <CartEmptyWarning />}
      <Separator />
      <OverviewContainer>
        Total ({numberOfArticles} articles): {total}€
      </OverviewContainer>
      <Separator />
      <Button
        onClick={proceedToPayment}
        disabled={numberOfArticles === 0}
        colorVariant={"primary"}
      >
        Got to payment now
      </Button>
    </CartContainer>
  )
}
