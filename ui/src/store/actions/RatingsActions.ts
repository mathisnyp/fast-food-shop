import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import { ExploringClient } from "../../api/Client/ExploringClient"
import { ShoppingClient } from "../../api/Client/ShoppingClient"
import { Comment } from "../../api/model"
import { RatingState } from "../reducers/RatingsReducer"
import { RootState } from "../../index"

export const fetchRatingsByArticleId: AsyncThunk<
  RatingState,
  string,
  { state: RootState }
> = createAsyncThunk<RatingState, string, { state: RootState }>(
  "ratings/fetchRatingsByArticleId",
  async (articleId: string, thunkAPI) => {
    const response = await ExploringClient.getRatingsOfArticleById(articleId)
    return response as RatingState
  }
)

export const postComment: AsyncThunk<void, Comment, { state: RootState }> =
  createAsyncThunk<void, Comment, { state: RootState }>(
    "ratings/postComment",
    async (comment: Comment, thunkAPI) => {
      await ShoppingClient.postComment(comment)
      await thunkAPI.dispatch(fetchRatingsByArticleId(comment.articleId))
    }
  )
