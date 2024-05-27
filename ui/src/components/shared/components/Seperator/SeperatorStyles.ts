import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { styled } from "../../../../shared/styles"

export const Separator = styled(SeparatorPrimitive.Root, {
  backgroundColor: "$primaryVariant",
  "&[data-orientation=horizontal]": { height: 1, width: "100%" },
  "&[data-orientation=vertical]": { height: "100%", width: 0.1 },
})
