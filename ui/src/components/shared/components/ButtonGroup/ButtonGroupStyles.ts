import { styled } from "../../../../shared/styles"

const borderRadius = "0.355em"

export const ButtonGroupContainer = styled("div", {
  display: "inline-flex",
  flexDirection: "row",
  "& > *": {
    marginLeft: "0em",
    borderRadius: 0,
    border: "solid 0.001em",
    borderBottom: "0px",
    borderTop: "0px",
  },
  "& > *:first-child": {
    borderLeft: 0,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: "0em",
    borderTopRightRadius: "0em",
  },
  "& > *:last-child": {
    borderRight: 0,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: "0em",
    borderTopLeftRadius: "0em",
  },
  variants: {
    alignment: {
      vertical: {
        flexDirection: "column",
        "& > *": {
          width: "100%",
          border: "solid 0.001em",
          borderRadius: 0,
          borderLeft: "0em",
          borderRight: "0em",
        },
        "& > *:first-child": {
          borderTop: 0,
          borderBottomRightRadius: "0em",
          borderBottomLeftRadius: "0em",
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        },
        "& > *:last-child": {
          borderBottom: 0,
          borderTopRightRadius: "0em",
          borderBottomRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
          borderTopLeftRadius: "0em",
        },
      },
      horizontal: {},
    },
  },
})
