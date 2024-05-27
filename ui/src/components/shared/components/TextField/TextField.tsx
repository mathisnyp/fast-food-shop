import React, {
  CSSProperties,
  HTMLInputTypeAttribute,
  RefObject,
  useState,
} from "react"
import { BiHide, BiShow } from "react-icons/bi"
import {
  HelpText,
  Label,
  TextFieldContainer,
  TextFieldIconWrapper,
  TextFieldInput,
  TextFieldInputContainer,
} from "./TextFieldStyles"
import { HashMap } from "../../../../shared/utils/HashMap"

type inputValueType = string | ReadonlyArray<string> | number

interface StyleNeeded extends CSSProperties, HashMap<any> {} //HashMap is needed to enable usage of media break points

interface TextFieldProps {
  label?: string
  isValid?: boolean
  helpText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  value?: inputValueType
  defaultValue?: inputValueType
  type?: HTMLInputTypeAttribute
  startFieldIcon?: React.ReactNode
  endFieldIcon?: React.ReactNode
  style?: StyleNeeded | undefined
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  inputRef?: RefObject<HTMLInputElement>
  isSearchBarVariant?: boolean
  readonly?: boolean
}

export function TextField(props: TextFieldProps) {
  const { label, isValid, helpText, startFieldIcon, endFieldIcon, style } = {
    ...props,
  }
  const isTypePassword = props.type === "password"

  const [type, setType] = useState(props.type)

  const changeInternalPasswordInputType = () => {
    if (type === "password") {
      setType("text")
    } else {
      setType("password")
    }
  }
  const onCopyPaste = isTypePassword
    ? (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
      }
    : undefined

  return (
    <TextFieldContainer
      isValid={isValid}
      style={{ width: style?.width ? "inherit" : "" }}
      isSearchBarVariant={props.isSearchBarVariant}
    >
      {label && <Label>{label}</Label>}
      <TextFieldInputContainer
        style={style}
        isSearchBarVariant={props.isSearchBarVariant}
      >
        {startFieldIcon && (
          <TextFieldIconWrapper>{startFieldIcon}</TextFieldIconWrapper>
        )}
        <TextFieldInput
          onChange={props.onChange}
          value={props.value}
          defaultValue={props.defaultValue}
          type={type}
          onBlur={props.onBlur}
          onPaste={onCopyPaste}
          onCopy={onCopyPaste}
          onKeyDown={props.onKeyDown}
          ref={props.inputRef}
          readOnly={props.readonly}
        />
        {endFieldIcon && (
          <TextFieldIconWrapper>{endFieldIcon}</TextFieldIconWrapper>
        )}
        {isTypePassword && (
          <span onClick={changeInternalPasswordInputType}>
            {type === "password" ? (
              <BiShow title={"Show password"} />
            ) : (
              <BiHide title={"Hide Password"} />
            )}
          </span>
        )}
      </TextFieldInputContainer>
      {helpText && <HelpText valid={isValid}>{helpText}</HelpText>}
    </TextFieldContainer>
  )
}
