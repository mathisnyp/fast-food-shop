import { styled } from "../../shared/styles"

export const EditProfileContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

export const EditProfileFormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  marginBottom: "0.25em",
  "@bp3": {
    display: "grid",
    gridTemplateColumns: "15em 15em",
    gridTemplateRows: "5em 5em 5em 5em 5em 5em 5em",
  },
})

export const PasswordsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5em",
})
