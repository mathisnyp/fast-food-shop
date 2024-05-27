import { styled } from "../../shared/styles"

export const OrdersContainer = styled("div", {
  overflowY: "auto",
  height: "78vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

export const SingleOrderContainer = styled("div", {
  marginBottom: "3em",
  boxShadow: "rgb(0 0 0 / 14%) 0em 0.125em 2em",
  padding: "0.5em",
  paddingRight: "1em",
  borderRadius: "0.25em",
  "@smallest": {
    width: "15em",
  },
  "@bp3": {
    width: "30em",
  },
})

export const OrderSummaryContainer = styled("div", {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
})

export const OrderArticlesContainer = styled("div", {
  marginTop: "0.25em",
})
