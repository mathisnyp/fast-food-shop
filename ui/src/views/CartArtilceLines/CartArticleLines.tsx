import React from "react"
import { ArticleLine, CartEmptyWarning } from "../../components"
import { useAppSelector } from "../../store/hooks"
import { ArticlesContainer } from "./CartArtilcleLinesStyles"

export function CartArticleLines() {
  const cartContent = useAppSelector((state) =>
    Object.values(state.orders.checkout)
  )

  if (cartContent.length === 0) {
    return <CartEmptyWarning />
  }

  const articleLines = cartContent.map((eachArticle) => {
    return (
      <ArticleLine
        article={eachArticle.article}
        orderPart={eachArticle.orderPart}
      />
    )
  })

  return <ArticlesContainer>{articleLines}</ArticlesContainer>
}
