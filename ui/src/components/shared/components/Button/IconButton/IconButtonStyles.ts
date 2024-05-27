import { styled } from "../../../../../shared/styles"
import { buttonColorVariants } from "../ButtonStyles"

const iconButtonMediumSizes = {
  height: "3em",
  width: "3em",
}
const IconButtonStyle = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  ...iconButtonMediumSizes,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$primary",
  backgroundColor: "inherit",
  boxShadow: "rgb(0 0 0 / 14%) 0em 0.125em 0.625em",
  variants: {
    sizeVariant: {
      sm: {
        height: "1em",
        width: "1em",
      },
      md: iconButtonMediumSizes,
      lg: {
        height: "2.2em",
        width: "2.2em",
        fontSize: "1.8rem",
      },
    },
    absoluteVariants: {
      articleCardBuy: {
        position: "absolute",
        textAlign: "right",
        marginLeft: "17.2em",
        marginTop: "-1.5em",
        "@bp1": {
          marginLeft: "22em",
        },
      },
    },
    ...buttonColorVariants,
  },
  "&:hover": { backgroundColor: "$surfaceVariant" },
  "&:focus": { boxShadow: "rgba(0, 0, 0, 0.25) 0em 0.2em 1.1em" },
})

export const IconButton = IconButtonStyle
