import { createSlice } from "@reduxjs/toolkit"
import React from "react"
import { User } from "../../api/model/user"
import {
  editUserProfile,
  fetchUserByLoginToken,
  login,
  logout,
  register,
} from "../actions/UserActions"
import _ from "lodash"

export interface ReactNodeWithName {
  node: React.ReactNode
  name: string
}

interface UserReducerState {
  isUserLoggedIn: boolean
  loggedInUser: User | undefined | null
}

const initialState = { isUserLoggedIn: false, loggedInUser: null }

const UserSlice = createSlice({
  name: "user",
  initialState: initialState as UserReducerState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isUserLoggedIn = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state = {
          ...state,
          isUserLoggedIn: true,
        }
        return state
      })
      .addCase(fetchUserByLoginToken.fulfilled, (state, action) => {
        state = {
          ...state,
          isUserLoggedIn: true,
          loggedInUser: action.payload,
        }
        return state
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        const adjustedUser = _.merge({}, state.loggedInUser, action.payload)
        state = {
          ...state,
          loggedInUser: adjustedUser,
        }
        return state
      })
      .addCase(logout.fulfilled, (state, action) => {
        const wasLogoutSuccessful = action.payload
        if (wasLogoutSuccessful) {
          state = initialState
        }
        return state
      }),
})

export const UserReducer = UserSlice.reducer
