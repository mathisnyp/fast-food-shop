import { styled } from "../../shared/styles"

export const PaymentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.7em",
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0.125em 0.625em",
  padding: "1em",
  borderRadius: "0.25em",
})

export const AddressContainer = styled("div", {
  fontWeight: 500,
  fontSize: "1.125rem",
})

export const ItemsContainer = styled("div", {})

export const OrderSummaryContainer = styled("div", {
  fontSize: "1.125rem",
  fontWeight: 500,
})

export const PayCard = styled("div", {})
