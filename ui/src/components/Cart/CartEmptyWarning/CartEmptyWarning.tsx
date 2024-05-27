import React from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { IconContainer, WarningContainer } from "./CartEmptyWarningStyles"

export const CartEmptyWarning = () => {
  return (
    <WarningContainer>
      <IconContainer>
        <HiOutlineExclamationCircle />
      </IconContainer>
      Your cart is empty
    </WarningContainer>
  )
}
