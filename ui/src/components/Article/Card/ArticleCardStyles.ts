import { styled } from "../../../shared/styles"

export const ArticleCardContainer = styled("div", {
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0em 0.8em",
  padding: "0.25em",
  borderRadius: "0.25em",
})

export const ArticleImagesContainer = styled("div", {
  height: "22em",
  width: "20.025em",
  "@bp1": {
    height: "28em",
    width: "25.025em",
  },
  zIndex: 20,
})

export const ArticleCardVegiImage = styled("img", {
  height: "2.8em",
  width: "2.8em",
  "@bp1": {
    height: "3.5em",
    width: "3.5em",
  },
  marginTop: "0.35em",
  marginLeft: "0.35em",
  zIndex: "10",
  position: "absolute",
  backgroundColor: "rgba(255,255,255,0.535)",
  borderRadius: "1.5em",
})

export const ArticleImage = styled("img", {
  height: "100%",
  width: "100%",
  zIndex: 500,
})

export const ArticleRatingContainer = styled("span", {})

export const ArticleNameContainer = styled("div", {
  fontSize: "1.3rem",
  fontWeight: 500,
})

export const ArticlePriceContainer = styled("div", {
  fontSize: "1rem",
  fontWeight: "400",
})

export const ArticleMwstContainer = styled("div", {
  fontSize: "0.75rem",
  fontWeight: 300,
})
