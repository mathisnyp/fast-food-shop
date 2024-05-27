import { styled } from "../../../../shared/styles"
import { shake } from "../../../../shared/styles/stitches/Keyframes"

export const TextFieldContainer = styled("div", {
  display: "inline-flex",
  flexDirection: "column",
  marginLeft: "1em",
  color: "$primary",
  variants: {
    isValid: {
      true: {},
      false: {
        color: "$errorColor",
        animation: `${shake} 0.25s ease-out both`,
      },
    },
    isSearchBarVariant: {
      true: {},
      false: { width: "14em" },
    },
  },
})

const textFieldFocused = {
  backgroundColor: "$surfaceVariant",
  boxShadow: "rgba(0, 0, 0, 0.25) 0em 0.2em 1.1em",
}

export const TextFieldInputContainer = styled("div", {
  display: "inline-flex",
  width: "100%",
  padding: "0.1125em",
  border: "solid 0.0625em",
  borderColor: "transparent",
  backgroundColor: "inherit",
  borderRadius: "0.355em",
  borderBottom: "solid 0.03125em",
  boxShadow: "rgba(0, 0, 0, 0.14) 0em 0.125em 0.625em",
  "&:focus-within": textFieldFocused,
  "&:hover": textFieldFocused,
  variants: {
    isSearchBarVariant: {
      true: {
        borderBottom: "none",
        height: "2.5em",
        width: "100%",
        fontSize: "1.2rem",
        "@bp1": { fontSize: "1.7rem", width: "8em", height: "1.5em" },
        "@bp2": { fontSize: "2.5rem", width: "9em", height: "0.92em" },
        "@bp3": { fontSize: "2.5rem", width: "10em", height: "1.5em" },
        "@bp4": { fontSize: "2.5rem", width: "24em", height: "1.5em" },
      },
      false: {},
    },
  },
})

export const Label = styled("label", {
  color: "inherit",
  fontWeight: 500,
})

export const TextFieldInput = styled("input", {
  border: "none",
  fontSize: "inherit",
  color: "inherit",
  display: "inline-flex",
  borderRadius: "inherit",
  backgroundColor: "inherit",
  "-webkit-appearance": "none",
  width: "100%",
  "&:focus": {
    outline: "none",
  },
})

export const TextFieldIconWrapper = styled("span", {
  color: "inherit",
  display: "inline-flex",
  borderRadius: "inherit",
  alignItems: "center",
})

export const HelpText = styled("label", {
  color: "$onBackground",
  fontSize: "0.8rem",
  fontWeight: 200,
  variants: {
    valid: {
      true: {},
      false: { color: "$errorColor" },
    },
  },
})
