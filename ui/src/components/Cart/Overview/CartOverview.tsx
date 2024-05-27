import React, { LegacyRef, useEffect, useMemo, useState } from "react"
import {
  Button,
  ButtonGroup,
  IconButton,
  Separator,
} from "../../shared/components"
import { CSSTransition } from "react-transition-group"
import { FaShoppingCart } from "react-icons/fa"
import { useHideOnClickOutside } from "../../shared/hooks/ClickOutside"
import { CartEmptyWarning } from "../CartEmptyWarning/CartEmptyWarning"
import { useAppSelector } from "../../../store/hooks"
import { CartState } from "../../../store/reducers/OrderReducer"
import { HashMap } from "../../../shared/utils/HashMap"
import { useNavigate } from "react-router-dom"
import { ArticleLine } from "../../Article/Line/ArticleLine"
import {
  CartArticlesContainer,
  CartOverviewContainer,
} from "./CartOverviewStyles"

interface CartOverviewProps {
  windowWidth: number
}

export function CartOverview({ windowWidth }: CartOverviewProps) {
  const navigate = useNavigate()

  const [cartContainerRef, isCartVisible, setIsCartVisible] =
    useHideOnClickOutside(false)
  const [openCartOverviewButtonEnabled, setOpenCartOverviewButtonEnabled] =
    useState(true)

  const articlesMap: HashMap<CartState> = useAppSelector(
    (state) => state.orders.checkout
  )
  const total: number = useAppSelector((state) => state.orders.checkoutTotal)

  useEffect(() => {
    if (articles.length !== 0) {
      openCartView()
    }
  }, [articlesMap])

  const articles: CartState[] = useMemo(
    () => Object.values(articlesMap),
    [articlesMap]
  )
  const articleDivs = useMemo(
    () =>
      articles.map((eachArticle) => {
        return (
          <ArticleLine
            key={eachArticle.article._id}
            article={eachArticle.article}
            orderPart={eachArticle.orderPart}
          />
        )
      }),
    [articlesMap]
  )

  const isOpenerIconButton = (windowWidth ?? 0) < 1600

  const openCartView = () => {
    if (openCartOverviewButtonEnabled) setIsCartVisible(true)
  }
  const hideCartOverView = () => {
    setIsCartVisible(false)
  }

  const buttonProps = {
    onClick: openCartView,
    disabled: !openCartOverviewButtonEnabled,
  }

  return (
    <div
      ref={cartContainerRef as unknown as LegacyRef<HTMLDivElement>}
      style={{ zIndex: "900" }}
    >
      {isOpenerIconButton ? (
        <IconButton
          {...buttonProps}
          sizeVariant={{
            "@initial": "md",
            "@bp3": "lg",
          }}
        >
          <FaShoppingCart />
        </IconButton>
      ) : (
        <Button
          {...buttonProps}
          isActivated={isCartVisible}
          sizeVariant={{
            "@initial": "md",
            "@bp3": "lg",
          }}
        >
          <FaShoppingCart />
          {total} €
        </Button>
      )}
      <CSSTransition
        in={isCartVisible}
        classNames={CartOverviewContainer.className}
        timeout={430}
        unmountOnExit
      >
        <CartOverviewContainer>
          <Button onClick={hideCartOverView}>Continue shopping</Button>
          <Separator />
          <CartArticlesContainer>
            {articleDivs.length === 0 ? <CartEmptyWarning /> : articleDivs}
          </CartArticlesContainer>
          <Separator />
          <ButtonGroup variant={"vertical"}>
            <Button
              onClick={() => {
                hideCartOverView()
                navigate("/checkout/cart")
              }}
              colorVariant={"primary"}
            >
              Go to shopping cart
            </Button>
            <Button
              onClick={() => {
                hideCartOverView()
                navigate("/checkout/pay")
              }}
              disabled={articles.length === 0}
              colorVariant={"secondary"}
            >
              Proceed to checkout
            </Button>
          </ButtonGroup>
        </CartOverviewContainer>
      </CSSTransition>
    </div>
  )
}
