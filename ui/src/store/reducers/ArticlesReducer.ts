import { createSlice } from "@reduxjs/toolkit"

import { Article, Category } from "../../api/dto"
import {
  fetchArticleById,
  fetchArticles,
  fetchArticlesByCategoryId,
  fetchArticlesByCategoryIds,
  fetchCategories,
  fetchIngredients,
  rateArticle,
} from "../actions/ArticlesActions"
import { cloneDeep, isNil } from "lodash"
import { HashMap } from "../../shared/utils/HashMap"

type ArticleIdToArticleMapType = HashMap<Article | null | undefined>

interface CurrentlySelectedArticle {
  article: Article
  boughtArticle?: boolean
  ratedArticle?: boolean
}

export interface ArticlesState {
  currentlyFilteredArticlesIdToArticleMap: ArticleIdToArticleMapType | null
  currentlyFilteredCategories?: string[] | null
  currentlySelectedArticle?: CurrentlySelectedArticle | null
  categories: Category[] | null
  availableIngredients: HashMap<string>
}

const initialState: ArticlesState = {
  categories: null,
  currentlyFilteredArticlesIdToArticleMap: {},
  availableIngredients: {},
}

const articleArrayToArticleIdToArticleMapType = (articleArray: Article[]) => {
  //Mapping articles to their ids, to enable constant lookup time
  let result: HashMap<Article> = {}
  articleArray.forEach((eachArticle) => {
    result[eachArticle._id] = eachArticle
  })
  return result
}

const ArticlesSlice = createSlice({
  name: "articles",
  initialState: initialState as ArticlesState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        return {
          ...state,
          categories: action.payload,
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const currentlyFilteredArticlesIdToArticleMap: ArticleIdToArticleMapType =
          articleArrayToArticleIdToArticleMapType(action.payload)

        return {
          ...state,
          currentlyFilteredCategories: null,
          currentlyFilteredArticlesIdToArticleMap:
            currentlyFilteredArticlesIdToArticleMap,
        }
      })
      .addCase(fetchArticlesByCategoryId.fulfilled, (state, action) => {
        const payload = action.payload
        const currentlyFilteredArticlesIdToArticleMap: ArticleIdToArticleMapType =
          articleArrayToArticleIdToArticleMapType(payload.articles)
        return {
          ...state,
          currentlyFilteredCategory: payload.categoryId,
          currentlyFilteredArticlesIdToArticleMap:
            currentlyFilteredArticlesIdToArticleMap,
        }
      })
      .addCase(fetchArticlesByCategoryIds.fulfilled, (state, action) => {
        const currentlyFilteredArticlesIdToArticleMap: ArticleIdToArticleMapType =
          articleArrayToArticleIdToArticleMapType(action.payload)
        state.currentlyFilteredArticlesIdToArticleMap =
          currentlyFilteredArticlesIdToArticleMap
        state.currentlyFilteredCategories = action.meta.arg
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        const currentlyFilteredArticlesIdToArticleMap = cloneDeep(
          state.currentlyFilteredArticlesIdToArticleMap
        )
        if (!isNil(currentlyFilteredArticlesIdToArticleMap)) {
          currentlyFilteredArticlesIdToArticleMap[action.payload.article._id] =
            action.payload.article
        }
        return {
          ...state,
          currentlySelectedArticle: {
            article: action.payload.article,
            boughtArticle:
              action.payload.articleUserCorrelation.didUserBuyArticle,
            ratedArticle:
              action.payload.articleUserCorrelation.didUserRateArticle,
          },
          currentlyFilteredArticlesIdToArticleMap:
            currentlyFilteredArticlesIdToArticleMap,
          currentlyFilteredCategories: [action.meta.arg],
        }
      })
      .addCase(rateArticle.fulfilled, (state, action) => {})
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.availableIngredients = action.payload
      }),
})

export const ArticlesReducer = ArticlesSlice.reducer
