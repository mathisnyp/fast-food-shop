import React from "react"
import StarRating from "react-svg-star-rating"
import { starCount } from "../Article/Card/ArticleCard"
import {
  RatingStarAction,
  RatingStarContainer,
  RatingStarLink,
} from "./RatingStarStyles"

interface DefaultRatingStarProps {
  rating?: number
  isReadOnly?: boolean
  handleOnClick?: (rating: number) => void
  showNumberOfRating?: boolean
  numberOfRatings?: number
  rateLink?: string
  action?: () => void
}

export function DefaultRatingStar(props: DefaultRatingStarProps) {
  const actionText = `(${props?.numberOfRatings ?? 0})`

  return (
    <RatingStarContainer>
      <StarRating
        unit={props.isReadOnly ? "float" : "half"}
        initialRating={props.rating}
        isReadOnly={props.isReadOnly}
        count={starCount}
        size={20}
        handleOnClick={props.handleOnClick}
      />
      {props.showNumberOfRating &&
        (props.rateLink ? (
          <RatingStarLink to={props?.rateLink ?? "/"}>
            {actionText}
          </RatingStarLink>
        ) : (
          <RatingStarAction onClick={props.action}>
            {actionText}
          </RatingStarAction>
        ))}
    </RatingStarContainer>
  )
}
