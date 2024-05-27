import { styled } from "../../../shared/styles"

export const WarningContainer = styled("div", {
  backgroundColor: "$primary",
  color: "$primaryVariant",
  fontSize: "2rem",
  borderRadius: "0.15em",
  display: "inline-flex",
  alignItems: "center",
  fontWeight: "200",
})

export const IconContainer = styled("span", {
  backgroundColor: "$primaryVariant",
  color: "$onPrimary",
  display: "inline-flex",
  alignItems: "center",
  padding: "0.1em",
  borderRadius: "0.15em",
  fontSize: "2rem",
})
