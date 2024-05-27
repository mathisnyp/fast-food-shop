import React, { useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { DefaultRatingStar } from "../../components"
import { Button, Separator } from "../../components/shared/components"
import { rateArticle } from "../../store/actions/ArticlesActions"
import { postComment } from "../../store/actions/RatingsActions"
import moment from "moment"
import { isNil } from "lodash"
import {
  CommentContainer,
  CommentDateContainer,
  CommentsContainer,
  CommentTextarea,
  FullRatingContainer,
  RatingActionsContainer,
  RatingInfoContainer,
  UsernameContainer,
} from "./RatingsStyle"

interface RatingsView {
  articleId: string
  didUserBuyArticle: boolean
  isUserLoggedIn: boolean
  didUserRateArticle: boolean
}

export function RatingsView(props: RatingsView) {
  const dispatch = useAppDispatch()

  const [selectedRating, setSelectedRating] = useState(0)
  const [comment, setComment] = useState("")

  const ratings = useAppSelector((state) => state.ratings)
  const ratingKeys: string[] = Object.keys(ratings ?? {})

  const userRatingsContainers = useMemo(
    () =>
      ratingKeys.map((eachRatingKey) => {
        if (ratings) {
          const { comments, rating, userName } = ratings[eachRatingKey]
          const commentDivs = comments?.map((eachComment) => {
            return (
              <CommentContainer key={eachComment._id}>
                <CommentDateContainer>{eachComment.date}:</CommentDateContainer>
                <div>{eachComment.comment}</div>
              </CommentContainer>
            )
          })
          return (
            <FullRatingContainer key={rating?._id ?? userName}>
              <RatingInfoContainer>
                <UsernameContainer>{userName}</UsernameContainer>
                {!isNil(rating?.rate) && (
                  <DefaultRatingStar rating={rating?.rate} isReadOnly />
                )}
              </RatingInfoContainer>
              <Separator style={{ width: "100%" }} />
              <CommentsContainer>{commentDivs}</CommentsContainer>
            </FullRatingContainer>
          )
        }
      }),
    [ratings]
  )

  const onRatingChanged = (rating: number) => {
    setSelectedRating(rating)
  }
  const onCommentTextChanged = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value)
  }

  return (
    <div>
      {props.didUserBuyArticle && props.isUserLoggedIn && (
        <RatingActionsContainer>
          <CommentTextarea
            value={comment}
            onChange={onCommentTextChanged}
          ></CommentTextarea>
          <Button
            onClick={() => {
              const date = moment().format("DD.MM.YYYY")

              dispatch(
                postComment({
                  articleId: props.articleId,
                  comment: comment,
                  date: date,
                })
              )
            }}
          >
            Post comment
          </Button>
          {!props.didUserRateArticle && (
            <>
              <DefaultRatingStar
                rating={selectedRating}
                handleOnClick={onRatingChanged}
              />
              <Button
                onClick={() => {
                  dispatch(
                    rateArticle({
                      rate: selectedRating,
                      articleId: props.articleId,
                    })
                  )
                }}
              >
                Post Rating
              </Button>
            </>
          )}
          <Separator />
        </RatingActionsContainer>
      )}
      {userRatingsContainers}
    </div>
  )
}
