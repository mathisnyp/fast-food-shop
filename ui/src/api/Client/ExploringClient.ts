import axios from "../axios-url"
import { Article, Category } from "../dto"
import { HashMap } from "../../shared/utils/HashMap"
import { RatingState } from "../../store/reducers/RatingsReducer"

export const ExploringClient = {
  getAllArticles: async () => {
    const response = await axios.get("fastfood/articles")
    return response.data as Article[]
  },
  getAllCategories: async () => {
    const response = await axios.get("fastfood/categories")
    return response.data as Category[]
  },
  getArticlesByCategory: async (categoryId: string) => {
    const response = await axios.get(`fastfood/articles/${categoryId}`)
    return response.data as Article[]
  },
  getArticlesByCategories: async (categoryIds: string[]) => {
    let result: Article[] = []
    for (let eachCategoryId of categoryIds) {
      const response = await axios.get(`fastfood/articles/${eachCategoryId}`)
      result = result.concat(response.data)
    }
    return result
  },
  getArticleById: async (articleId: string) => {
    const response = await axios.get(`fastfood/article/${articleId}`)
    return response.data as Article
  },
  getRatingsOfArticleById: async (articleId: string) => {
    const response = await axios.get(`fastfood/ratings/${articleId}`)
    return response.data as RatingState
  },
  getAvailableIngredients: async () => {
    const response = await axios.get("/fastfood/ingredients")
    const responseArray = response.data as string[]
    const map: HashMap<string> = {}
    responseArray.forEach((eachIngredient) => {
      //map ingredients to object to enable constant lookup time
      map[eachIngredient] = eachIngredient
    })
    return map
  },
}
