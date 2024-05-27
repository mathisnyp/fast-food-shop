import React from "react"
import { StyledButton } from "./ButtonStyles"
import { HashMap } from "../../../../shared/utils/HashMap"

interface ButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  disabled?: boolean
  isActivated?: boolean
  hideTextIfScreenTooSmall?: boolean
  sizeVariant?: "sm" | "md" | "lg" | HashMap<"sm" | "md" | "lg">
  colorVariant?: "primary" | "secondary"
  style?: React.CSSProperties
}

export function Button({
  onClick,
  startIcon,
  children,
  endIcon,
  disabled,
  isActivated,
  hideTextIfScreenTooSmall,
  sizeVariant,
  colorVariant,
  style,
}: ButtonProps) {
  const hideText = hideTextIfScreenTooSmall
    ? { "@bp3": false, "@initial": true }
    : false

  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      disabledStyle={disabled}
      activated={isActivated}
      sizeVariant={sizeVariant}
      colorVariant={colorVariant}
      hideText={hideText}
      style={style}
    >
      {startIcon}
      {children}
      {endIcon}
    </StyledButton>
  )
}
