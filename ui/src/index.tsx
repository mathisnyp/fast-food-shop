import React from "react"
import ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import App from "./App"
import {
  ArticlesReducer,
  OrderReducer,
  RatingsReducer,
  StaticallyPlacedComponentsReducer,
  UserReducer,
} from "./store/reducers"
import { fetchUserByLoginToken } from "./store/actions/UserActions"
import { fetchIngredients } from "./store/actions/ArticlesActions"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const store = configureStore({
  reducer: {
    staticallyPlacedComponentsReducer: StaticallyPlacedComponentsReducer,
    user: UserReducer,
    orders: OrderReducer,
    ratings: RatingsReducer,
    articles: ArticlesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

store.dispatch(fetchIngredients()) //To prevent multiple expensive fetching

store.dispatch(fetchUserByLoginToken()).then(
  //To check if user is already logged in
  () =>
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
