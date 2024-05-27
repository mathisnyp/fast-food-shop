import { styled } from "../../shared/styles"

export const ArticlePageContainer = styled("div", {
  borderRadius: "1.5em",
  padding: "0.25em",
  boxShadow: "rgb(0 0 0 / 14%) 0em 0.125em 0.625em",
  "@initial": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  "@bp3": {
    display: "grid",
    gridTemplateColumns: "30em 20em",
    gridTemplateRows: "5em 5em 5em 5em 5em 2em 40em",
  },
})

export const ArticleImagesContainer = styled("div", {
  gridColumn: "1",
  paddingRight: "2em",
  "@initial": {},
  "@bp3": { gridRow: "1 / 6" },
})

export const ArticleVegiImage = styled("img", {
  height: "3.5em",
  width: "3.5em",
  marginTop: "0.35em",
  marginLeft: "0.35em",
  zIndex: "100",
  position: "absolute",
  backgroundColor: "rgba(255,255,255,0.535)",
  borderRadius: "1.5em",
  "@initial": {},
  "@bp3": {},
})

export const ArticleImage = styled("img", {
  height: "100%",
  width: "100%",
  borderRadius: "1.5em",
})

export const ArticleNameContainer = styled("span", {
  fontWeight: 700,
  fontSize: "2rem",
  alignItems: "center",
  display: "flex",
  "@initial": {},
  "@bp3": { gridRow: "1", gridColumn: "2" },
})

export const ArticleInfoContainer = styled("span", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1.7rem",
  fontWeight: 400,
  "@initial": {},
  "@bp3": { gridRow: "2", gridColumn: "2" },
})

export const ArticleShortDescriptionContainer = styled("span", {
  "@initial": {},
  "@bp3": { gridRow: "3", gridColumn: "2" },
})

export const ArticleActionsContainer = styled("span", {
  display: "flex",
  alignItems: "end",
  justifyContent: "flex-start",
  "@initial": {},
  "@bp3": { gridRow: "4", gridColumn: "2" },
})

export const TabsContainer = styled("div", {
  "@initial": {},
  "@bp3": { marginTop: "2em", gridRow: "6 / 8", gridColumn: "1 / 3" },
})

export const TabsContentContainer = styled("div", {
  overflowY: "auto",
  "@initial": {},
  "@bp3": { height: "34em" },
})
