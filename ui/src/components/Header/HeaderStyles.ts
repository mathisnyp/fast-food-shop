import { styled } from "../../shared/styles"
import {
  pageContentsSideMarginBp2,
  pageContentsSideMarginBp3,
  pageContentsSideMarginBp4,
} from "../../shared/styles/stitches/PageContentsContainer"

export const HeaderContainer = styled("header", {
  display: "block",
  zIndex: 800,
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0.125em 0.625em",
})

export const HeaderContentWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "0.5em",
  paddingRight: "0em",
  backgroundColor: "inherit",
  border: "solid 0.0625em",
  borderColor: "transparent",
  margin: "0em 0em",
  "@bp2": {
    margin: `0em ${pageContentsSideMarginBp2}`,
  },
  "@bp3": {
    margin: `0em ${pageContentsSideMarginBp3}`,
  },
  "@bp4": {
    margin: `0em ${pageContentsSideMarginBp4}`,
  },
})

export const PageTitleWrapper = styled("span", {
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
})
