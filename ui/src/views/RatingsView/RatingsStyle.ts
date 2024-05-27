import { styled } from "../../shared/styles"

export const FullRatingContainer = styled("div", {
  boxShadow: "rgb(0 0 0 / 14%) 0em 0.2em 0.6em",
  borderRadius: "0.7em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginLeft: "0.5em",
  marginRight: "0.5em",
  marginBottom: "1em",
})

export const RatingActionsContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginBottom: "2em",
  gap: "1em",
})

export const CommentTextarea = styled("textarea", {
  minHeight: "6em",
})

export const RatingInfoContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
})

export const UsernameContainer = styled("div", {
  fontWeight: 500,
  fontSize: "1.25rem",
})

export const CommentsContainer = styled("div", { width: "100%", margin: "1em" })

export const CommentContainer = styled("div", {
  width: "100%",
  marginBottom: "1em",
})

export const CommentDateContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "start",
  fontWeight: 400,
  fontSize: "1.2rem",
})
