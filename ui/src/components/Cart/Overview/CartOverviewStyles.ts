import { styled } from "../../../shared/styles"
import {
  slideInFromRight,
  slideOutToRight,
} from "../../../shared/styles/stitches/Keyframes"

export const slideOutCartOverviewAnimationDuration = 450

export const CartOverviewContainer = styled("div", {
  backgroundColor: "$background",
  display: "flex",
  width: "23em",
  flexDirection: "column",
  gap: "2em",
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 1500,
  height: "100%",
  overflowY: "auto",
  padding: "0.5em",
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0em 0.8em",
  alignItems: "center",
  "&-enter-active": {
    animation: `${slideOutCartOverviewAnimationDuration}ms ease-out 0s 1 ${slideInFromRight}`,
  },
  "&-exit": {
    animation: `${slideOutCartOverviewAnimationDuration}ms ease-out 0s 1 ${slideOutToRight}`,
  },
  "&-enter-exit": {
    opacity: 0,
  },
})

export const CartArticlesContainer = styled("span", {
  display: "inline-flex",
  flexDirection: "column",
  gap: "0.8em",
  paddingLeft: "1em",
  paddingRight: "1em",
})

export const CartBottomButtonGroup = styled("span", {
  display: "inline-flex",
  flexDirection: "column",
  gap: "0.8em",
})
