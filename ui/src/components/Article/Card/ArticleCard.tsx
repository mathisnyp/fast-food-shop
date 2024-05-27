import React from "react"
import { Article } from "../../../api/dto"
import { Link } from "react-router-dom"
import { IconButton } from "../../shared/components"
import { FaShoppingCart } from "react-icons/fa"
import { useAppDispatch } from "../../../store/hooks"
import { addArticleToCart } from "../../../store/actions/OrderActions"
import {
  ArticleCardContainer,
  ArticleCardVegiImage,
  ArticleImage,
  ArticleImagesContainer,
  ArticleMwstContainer,
  ArticleNameContainer,
  ArticlePriceContainer,
  ArticleRatingContainer,
} from "./ArticleCardStyles"
import { DefaultRatingStar } from "../../RatingStars/DefaultRatingStar"

interface ArticleCardProps {
  article: Article
}

export const starCount = 5

export function ArticleCard({ article }: ArticleCardProps) {
  const isVegetarian = article.vegetarian
  const tooltipText = `${article.name}${isVegetarian ? " (vegetarian)" : ""}`

  const dispatch = useAppDispatch()

  const addItemToShoppingCart = () => {
    dispatch(addArticleToCart(article))
  }

  return (
    <ArticleCardContainer>
      <Link to={`/article/${article._id}`} title={tooltipText}>
        <ArticleImagesContainer>
          {isVegetarian && (
            <ArticleCardVegiImage
              src={require("../../../images/vegetarian.png")}
              alt={"Could not load vegetarian checkmark"}
              title={"This item is vegetarian"}
            />
          )}
          <ArticleImage src={article.href} alt={"Unable to load image"} />
        </ArticleImagesContainer>
      </Link>

      <IconButton
        onClick={addItemToShoppingCart}
        sizeVariant={"md"}
        colorVariant={"primary"}
        absoluteVariants={"articleCardBuy"}
      >
        <FaShoppingCart />
      </IconButton>
      <ArticleRatingContainer
        title={`Average rating of ${article.rating} from ${starCount}`}
      >
        <DefaultRatingStar
          rating={article.rating}
          isReadOnly
          showNumberOfRating
          numberOfRatings={article?.numberOfRatings ?? 0}
          rateLink={`/article/${article._id}/ratings`}
        />
      </ArticleRatingContainer>
      <ArticleNameContainer>{article.name}</ArticleNameContainer>
      <ArticlePriceContainer>{article.price} €</ArticlePriceContainer>
      <ArticleMwstContainer>inkl. MwSt zzgl. Versand</ArticleMwstContainer>
    </ArticleCardContainer>
  )
}
