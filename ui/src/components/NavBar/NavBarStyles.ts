import { styled } from "../../shared/styles"

export const NavbarWrapper = styled("span", {
  display: "inline-flex",
  height: "inherit",
  zIndex: 8000,
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5em",
  "@bp3": {
    gap: "2em",
  },
})
