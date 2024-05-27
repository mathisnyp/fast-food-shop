import { styled } from "../../shared/styles"

export const LoginContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2em",
})

export const LoginTextFieldsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2em",
  "@bp3": {
    flexDirection: "row",
  },
})
