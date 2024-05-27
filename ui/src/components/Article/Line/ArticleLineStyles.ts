import { styled } from "../../../shared/styles"

export const ArticleLineContainer = styled("div", {
  height: "6em",
  width: "100%",
  display: "flex",
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0.125em 0.625em",
  padding: "0.3em",
  borderRadius: "0.25em",
  variants: {
    viewOnly: {
      true: {
        cursor: "pointer",
      },
      false: {},
    },
  },
})

export const ArticleLineImage = styled("img", {
  height: "100%",
  width: "65%",
  "@bp1": {
    width: "5em",
  },
  cursor: "pointer",
})

export const ArticleLineSummaryContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between",
  width: "40%",
})

export const ArticleInformationContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginLeft: "0.35em",
  width: "inherit",
})

export const QuantityContainer = styled("span", {
  width: "4em",
  height: "1.3750em",
  marginBottom: "0.3em",
})
