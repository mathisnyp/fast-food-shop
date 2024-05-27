import { styled } from "../../shared/styles"

export const OrderConfirmationPageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2em",
})

export const ThankYouContainer = styled("div", {
  fontWeight: 800,
  display: "flex",
  justifyContent: "center",
  "@smallest": {
    fontSize: "3rem",
  },
  "@bp3": {
    fontSize: "5rem",
  },
})

export const CheckMarkContainer = styled("div", {
  justifyContent: "center",
  display: "flex",
})

export const CheckMarkImage = styled("img", { height: "15em", width: "10em" })

export const ArrivalTextContainer = styled("div", {
  fontWeight: 200,
  justifyContent: "center",
  display: "flex",
  "@smallest": {
    fontSize: "2rem",
  },
  "@bp3": {
    fontSize: "3rem",
  },
})

export const ActionsContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
})
