import { createAction, createSlice } from "@reduxjs/toolkit"
import React from "react"

export interface ReactNodeWithName {
  node: React.ReactNode
  name: string
}

export const addComponent = createAction(
  "staticallyPlacedComponents/addComponent"
)
export const removeComponent = createAction(
  "staticallyPlacedComponents/removeComponent"
)
export const notifyAboutChange = createAction(
  "staticallyPlacedComponents/notifyAboutChange"
)

const StaticallyPlacedComponentsSlice = createSlice({
  name: "staticallyPlacedComponents",
  initialState: { count: 0, changeIndicator: true } as {
    count: number
    changeIndicator: boolean
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addComponent, (state, action) => {
        return {
          count: state.count + 1,
          changeIndicator: !state.changeIndicator,
        }
      })
      .addCase(removeComponent, (state, action) => {
        return {
          count: state.count + 1,
          changeIndicator: !state.changeIndicator,
        }
      })
      .addCase(notifyAboutChange, (state, action) => {
        return {
          count: state.count,
          changeIndicator: !state.changeIndicator,
        }
      }),
})

export const StaticallyPlacedComponentsReducer =
  StaticallyPlacedComponentsSlice.reducer
