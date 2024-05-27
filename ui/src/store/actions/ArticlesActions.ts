import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"

import { Rating } from "../../api/model"
import { ExploringClient } from "../../api/Client/ExploringClient"
import { ShoppingClient } from "../../api/Client/ShoppingClient"
import { Article, Category } from "../../api/dto"
import { ArticlesState } from "../reducers/ArticlesReducer"
import { isNil } from "lodash"
import { UserManagementClient } from "../../api/Client/UserManagementClient"
import { RootState } from "../../index"
import { ArticleUserCorrelation } from "../../api/dto/ArticleUserCorrelation"
import { HashMap } from "../../shared/utils/HashMap"
import { fetchRatingsByArticleId } from "./RatingsActions"

export const fetchCategories: AsyncThunk<
  Category[],
  void,
  { state: RootState }
> = createAsyncThunk<Category[], void, { state: RootState }>(
  "articles/fetchCategories",
  async (arg, thunkAPI) => {
    return await ExploringClient.getAllCategories()
  }
)

export const fetchArticles: AsyncThunk<Article[], void, { state: RootState }> =
  createAsyncThunk<Article[], void, { state: RootState }>(
    "articles/fetchArticles",
    async (arg, thunkAPI) => {
      return await ExploringClient.getAllArticles()
    }
  )

interface ArticlesFilteredById {
  articles: Article[]
  categoryId: string
}

export const fetchArticlesByCategoryId: AsyncThunk<
  ArticlesFilteredById,
  string,
  { state: RootState }
> = createAsyncThunk<ArticlesFilteredById, string, { state: RootState }>(
  "articles/fetchArticlesByCategoryId",
  async (categoryId: string, thunkAPI) => {
    const articles = await ExploringClient.getArticlesByCategory(categoryId)
    const result: ArticlesFilteredById = {
      articles: articles,
      categoryId: categoryId,
    }
    return result
  }
)

export const fetchArticlesByCategoryIds: AsyncThunk<
  Article[],
  string[],
  { state: RootState }
> = createAsyncThunk<Article[], string[], { state: RootState }>(
  "articles/fetchArticlesByCategoryIds",
  async (categoryIds: string[], thunkAPI) => {
    return await ExploringClient.getArticlesByCategories(categoryIds)
  }
)

interface ArticleFetchResult {
  article: Article
  articleUserCorrelation: ArticleUserCorrelation
}
export const fetchArticleById: AsyncThunk<
  ArticleFetchResult,
  string,
  { state: RootState }
> = createAsyncThunk<ArticleFetchResult, string, { state: RootState }>(
  "articles/fetchArticleById",
  async (articleId: string, thunkAPI) => {
    //Check if fetched article is already in state only fetch it from the api otherwise
    let article = null
    const currentlyFilteredArticlesIdToArticleMap = (
      thunkAPI.getState().articles as ArticlesState
    ).currentlyFilteredArticlesIdToArticleMap
    const articleResult = currentlyFilteredArticlesIdToArticleMap?.[articleId]
    if (!isNil(articleResult)) {
      article = articleResult
    } else {
      article = await ExploringClient.getArticleById(articleId)
    }
    let articleUserCorrelation: ArticleUserCorrelation
    if (thunkAPI.getState().user.isUserLoggedIn) {
      articleUserCorrelation =
        await UserManagementClient.didUserBuyOrRateArticle(articleId)
    } else {
      articleUserCorrelation = {
        didUserRateArticle: false,
        didUserBuyArticle: false,
      }
    }
    return {
      article: article,
      articleUserCorrelation: articleUserCorrelation,
    } as ArticleFetchResult
  }
)

export const rateArticle: AsyncThunk<void, Rating, { state: RootState }> =
  createAsyncThunk<void, Rating, { state: RootState }>(
    "articles/rateArticle",
    async (rating: Rating, thunkAPI) => {
      await ShoppingClient.rateArticle(rating)
      const currentState = thunkAPI.getState().articles
      const ratedArticleInCurrentlyFilteredArticles =
        currentState.currentlyFilteredArticlesIdToArticleMap?.[rating.articleId]
      const currentlySelectedArticle = currentState.currentlySelectedArticle
      if (
        !isNil(currentlySelectedArticle) &&
        currentlySelectedArticle.article._id === rating.articleId
      ) {
        thunkAPI.dispatch(fetchArticleById(rating.articleId))
        thunkAPI.dispatch(fetchRatingsByArticleId(rating.articleId))
      } else if (!isNil(ratedArticleInCurrentlyFilteredArticles)) {
        if (isNil(currentState.currentlyFilteredCategories)) {
          thunkAPI.dispatch(fetchArticles())
        } else {
          thunkAPI.dispatch(
            fetchArticlesByCategoryIds(currentState.currentlyFilteredCategories)
          )
        }
      }
    }
  )

export const fetchIngredients: AsyncThunk<
  HashMap<string>,
  void,
  { state: RootState }
> = createAsyncThunk<HashMap<string>, void, { state: RootState }>(
  "articles/ingredients",
  async (arg, thunkAPI) => {
    return await ExploringClient.getAvailableIngredients()
  }
)
