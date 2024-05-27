import { styled } from "../../../../shared/styles"

const activatedStyle = {
  backgroundColor: "$surfaceVariant",
  boxShadow: "rgba(0, 0, 0, 0.25) 0em 0.2em 1.1em",
}

export const buttonColorVariants = {
  colorVariant: {
    primary: {
      backgroundColor: "$primary",
      color: "$onPrimary",
      "&:hover": { backgroundColor: "$primaryVariant" },
    },
    secondary: {
      backgroundColor: "$secondary",
      color: "$onSecondary",
      "&:hover": { backgroundColor: "$secondaryVariant" },
    },
  },
}
const mediumButtonSizes = {
  fontSize: "2rem",
  gap: "0.5em",
  height: "1.3em",
  padding: "0.2em",
}
export const StyledButton = styled("button", {
  color: "$primary",
  display: "inline-flex",
  borderWidth: "0.0625em 0.0625em 0.03125em",
  borderStyle: "solid",
  borderImage: "initial",
  borderColor: "transparent",
  backgroundColor: "inherit",
  borderRadius: "0.355em",
  boxShadow: "rgb(0 0 0 / 14%) 0em 0.125em 0.625em",
  alignItems: "center",
  ...mediumButtonSizes,
  width: "fit-content",
  "&:hover": activatedStyle,
  variants: {
    ...buttonColorVariants,
    sizeVariant: {
      sm: {
        fontSize: "1.5rem",
        gap: "0.5em",
        height: "1.3em",
        padding: "0.2em",
      },
      md: mediumButtonSizes,
      lg: {
        fontSize: "2.5rem",
        gap: "0.6em",
        height: "1.6em",
        padding: "0.25em",
      },
    },
    activated: {
      true: { ...activatedStyle },
      false: {},
    },
    disabledStyle: {
      false: {},
      true: { cursor: "not-allowed" },
    },
    hideText: {
      true: { textIndent: "-9999px" },
      false: {},
    },
  },
})
