import React from "react"
import { ButtonGroupContainer } from "./ButtonGroupStyles"

interface ButtonGroupProps {
  children: React.ReactNode[]
  variant?: "horizontal" | "vertical"
}

export function ButtonGroup({ children, variant }: ButtonGroupProps) {
  return (
    <ButtonGroupContainer
      data-test-key={"hallo welt"}
      alignment={variant ?? "horizontal"}
    >
      {children}
    </ButtonGroupContainer>
  )
}
