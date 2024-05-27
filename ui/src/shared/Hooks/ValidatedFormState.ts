import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react"

export function useValidatedFormState<S>(
  initialSateValue: S
): [
  S,
  Dispatch<SetStateAction<S>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  RefObject<HTMLInputElement>
] {
  const [stateValue, setStateValue] = useState<S>(initialSateValue)
  const [isStateValueValid, setIsStateValueValid] = useState(false)
  const [dontShowStateValidation, setDontShowStateValidation] = useState(true)
  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
  return [
    stateValue as S,
    setStateValue as React.Dispatch<React.SetStateAction<S>>,
    isStateValueValid as boolean,
    setIsStateValueValid as React.Dispatch<React.SetStateAction<boolean>>,
    dontShowStateValidation as boolean,
    setDontShowStateValidation as React.Dispatch<React.SetStateAction<boolean>>,
    inputRef as RefObject<HTMLInputElement>,
  ]
}
