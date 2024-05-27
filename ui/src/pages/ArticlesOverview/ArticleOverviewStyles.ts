import { styled } from "../../shared/styles"

export const OverviewContainer = styled("div", {})

export const FiltersLine = styled("div", {
  display: "grid",
  marginLeft: "8em",
  marginRight: "8em",
  gridTemplateColumns: "10em 10em",
  gridTemplateRows: "10em 4em",
  justifyItems: "center",
  "@bp1": {
    display: "inline-flex",
    justifyContent: "space-evenly",
    width: "100%",
    flexWrap: "wrap",
  },
})

export const CategoriesFilterContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gridColumn: "1",
  gridRow: "1",
})

export const VegiFilterContainer = styled("div", {
  gridColumn: "1",
  gridRow: "2",
})

export const IngredientsFilterContainer = styled("div", {
  gridColumn: "2",
  gridRow: "1",
  overflow: "auto",
  zIndex: 2000,
  "@bp1": {
    overflow: "inherit"
  }
})

export const SelectContainer = styled("div", {
  width: "fit-content",
  marginBottom: "2.2em",
})

export const ArticlesContainer = styled("div", {
  display: "flex",
  gap: "1.25em 6.25em",
  flex: "0 0 100%",
  maxWidth: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "1em",
})
