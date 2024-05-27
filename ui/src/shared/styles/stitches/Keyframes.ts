import { keyframes } from "./GeneralSettings"

export const spin = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
})

export const slideInFromRight = keyframes({
  from: {
    transform: "translateX(95%)",
  },
  to: {
    transform: "translateX(0)",
  },
})

export const slideOutToRight = keyframes({
  from: {
    transform: "translateX(0)",
  },
  to: {
    transform: "translateX(100%)",
  },
})

export const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

export const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

export const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
})

export const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
})

export const shake = keyframes({
  "10%, 90%": {
    transform: "translate3d(-0.5px, 0, 0)",
  },
  "20%, 80%": {
    transform: "translate3d(0.1px, 0, 0)",
  },
  "30%, 50%, 70%": {
    transform: "translate3d(-2px, 0, 0)",
  },

  "40%, 60%": {
    transform: "translate3d(2px, 0, 0)",
  },
})

export const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
})

export const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
})
