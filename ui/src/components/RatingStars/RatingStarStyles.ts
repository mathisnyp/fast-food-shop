import { styled } from "../../shared/styles"
import { Link } from "react-router-dom"

export const RatingStarContainer = styled("span", {
  display: "flex",
  gap: "0.25em",
})

const actionContainerStyles = {
  color: "$onBackground",
  textDecoration: "none",
  display: "flex",
  justifyContent: "center",
  fontSize: "1rem",
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}

export const RatingStarLink = styled(Link, actionContainerStyles)

export const RatingStarAction = styled("span", actionContainerStyles)
