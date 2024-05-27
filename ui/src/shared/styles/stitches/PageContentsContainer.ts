import { styled } from "./GeneralSettings"

export const pageContentsSideMarginBp4 = "19em"
export const pageContentsSideMarginBp3 = "10em"
export const pageContentsSideMarginBp2 = "4em"

export const PageContentsContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  margin: "1em 0em",
  "@bp2": {
    padding: `2em "${pageContentsSideMarginBp2}"`,
  },
  "@bp3": {
    padding: `3em "${pageContentsSideMarginBp3}"`,
  },
  "@bp4": {
    padding: `3em ${pageContentsSideMarginBp4}`,
  },
})
