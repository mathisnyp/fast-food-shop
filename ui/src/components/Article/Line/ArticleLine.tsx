import React, { useEffect, useMemo, useState } from "react"
import { Article } from "../../../api/dto"
import { ArticleQuantity, OrderPart } from "../../../api/model/order"
import {
  ArticleInformationContainer,
  ArticleLineContainer,
  ArticleLineImage,
  ArticleLineSummaryContainer,
  QuantityContainer,
} from "./ArticleLineStyles"
import { isNil, keys } from "lodash"
import { IconButton, Select, Separator } from "../../shared/components"
import { CgClose } from "react-icons/cg"
import { useAppDispatch } from "../../../store/hooks"
import {
  modifyArticleInCart,
  removeArticleFromCart,
} from "../../../store/actions/OrderActions"
import { useNavigate } from "react-router-dom"

interface ArticleLineProps {
  article: Article | ArticleQuantity
  viewOnly?: boolean
  orderPart?: OrderPart
}

export function ArticleLine(props: ArticleLineProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { article, viewOnly, orderPart } = { viewOnly: false, ...props }

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [total, setTotal] = useState(article.price)

  useEffect(() => {
    if (!isNil((article as ArticleQuantity).selectedQuantity)) {
      const articleQuantity = article as ArticleQuantity
      setTotal(articleQuantity.totalPrice)
      setSelectedQuantity(articleQuantity.selectedQuantity)
    } else {
      setTotal(orderPart?.price ?? article.price)
      setSelectedQuantity(orderPart?.quantity ?? 1)
    }
  }, [props.article, props.orderPart])

  const availableQuantities = useMemo(() => {
    return [...keys(Array(article.quantity - 1))].map((eachQuantity) => {
      const realQuantity = parseInt(eachQuantity) + 1
      return (
        <option value={realQuantity} key={realQuantity}>
          {realQuantity}
        </option>
      )
    })
  }, [article.quantity])

  const onChangeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const adjustedQuantity = parseInt(event.target.value)
    dispatch(
      modifyArticleInCart({
        price: total,
        quantity: adjustedQuantity,
        articleId: article._id,
      })
    )
    setSelectedQuantity(adjustedQuantity)
  }
  const onRemoveItem = () => {
    dispatch(removeArticleFromCart(article._id))
  }
  const onGoToArticle = () => {
    const ratingsPart = viewOnly ? `/ratings` : ""
    navigate(`/article/${article._id}${ratingsPart}`)
  }

  return (
    <ArticleLineContainer
      onClick={viewOnly ? onGoToArticle : undefined}
      viewOnly={viewOnly}
      title={viewOnly ? "View article" : undefined}
    >
      <ArticleLineImage
        src={article.href}
        alt={"Failed to load image"}
        onClick={onGoToArticle}
        title={"View article"}
      />
      <Separator orientation={"vertical"} />
      <ArticleInformationContainer>
        <span>
          {selectedQuantity} x {article.name}
        </span>
        <span>{article.price}€</span>
        <QuantityContainer>
          {!viewOnly ? (
            <Select
              name={"Quantity"}
              id={"quantity"}
              aria-valuemax={10}
              value={selectedQuantity}
              onChange={onChangeQuantity}
            >
              {availableQuantities}
            </Select>
          ) : (
            <span>{selectedQuantity}</span>
          )}
        </QuantityContainer>
      </ArticleInformationContainer>
      <ArticleLineSummaryContainer>
        {!viewOnly ? (
          <IconButton onClick={onRemoveItem}>
            <CgClose />
          </IconButton>
        ) : (
          <span />
        )}
        <span>
          Subtotal: <br /> {total}€
        </span>
      </ArticleLineSummaryContainer>
    </ArticleLineContainer>
  )
}
