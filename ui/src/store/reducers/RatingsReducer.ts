import { createSlice } from "@reduxjs/toolkit"
import { fetchRatingsByArticleId, postComment } from "../actions/RatingsActions"
import { Comments, Rating } from "../../api/dto"
import { HashMap } from "../../shared/utils/HashMap"

interface UserRatings {
  comments: Comments
  rating: Rating
  userName: string
}

export type RatingState = HashMap<UserRatings>

export type RatingsStateType = RatingState | undefined | null

const initialState: RatingsStateType = null

const RatingsSlice = createSlice({
  name: "comments",
  initialState: initialState as RatingsStateType,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRatingsByArticleId.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(postComment.fulfilled, (state, action) => {}),
})

export const RatingsReducer = RatingsSlice.reducer
