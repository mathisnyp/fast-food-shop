import { styled } from "../../shared/styles"

export const StyledLogoImg = styled("img", {
  height: "2.9em",
  maxWidth: "6.5em",
  "&:hover": {
    cursor: "pointer",
  },
  "@bp3": {
    height: "5.025em",
    maxWidth: "12.5em",
  },
})
