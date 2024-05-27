import React from "react"
import { styled } from "../../../../shared/styles"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import {
  contentShow,
  overlayShow,
} from "../../../../shared/styles/stitches/Keyframes"

//Mainly taken from https://www.radix-ui.com/docs/primitives/components/dialog
const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "transparent",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$background",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
})

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogClose = DialogPrimitive.Close

interface ContentProps {
  children: React.ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent>{children}</StyledContent>
    </DialogPrimitive.Portal>
  )
}
