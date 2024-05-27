import { createStitches } from "@stitches/react"
import Colors from "../CommonProporties"

export const { styled, css, globalCss, keyframes, getCssText, createTheme } =
  createStitches({
    media: {
      //smallest is just used as a workaround for some minor bugs
      smallest: "(min-width: 5px)",
      bp1: "(min-width: 640px)",
      bp2: "(min-width: 768px)",
      bp3: "(min-width: 1024px)",
      bp4: "(min-width: 1700px)",
    },
    theme: {
      colors: {
        primary: Colors.primary,
        primaryVariant: Colors.primaryVariant,
        secondary: Colors.secondary,
        secondaryVariant: Colors.secondaryVariant,
        background: Colors.background,
        surface: Colors.surface,
        surfaceVariant: Colors.surfaceVariant,

        onPrimary: Colors.onPrimary,
        onSecondary: Colors.onSecondary,

        onBackground: Colors.onBackground,
        onSurface: Colors.onSurface,

        onError: Colors.onError,
        errorColor: Colors.errorColor,
      },
      space: {
        sm: "0.17em",
        md: "0.2em",
        lg: "0.22em",
      },
      fontSizes: {
        sm: "2.5rem",
        md: "2rem",
        lg: "1.5rem",
      },
      fontWeights: {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500,
        6: 600,
        7: 700,
        8: 800,
        9: 900,
      },
    },
  })
