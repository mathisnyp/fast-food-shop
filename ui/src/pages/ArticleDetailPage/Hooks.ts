import { Article } from "../../api/dto"
import { useAppSelector } from "../../store/hooks"

export function useArticleDetailInformations() {
  const article: Article | null | undefined = useAppSelector(
    (state) => state.articles.currentlySelectedArticle?.article
  )
  const didBuyArticle: boolean = useAppSelector(
    (state) => state.articles.currentlySelectedArticle?.boughtArticle ?? false
  )
  const didRateArticle: boolean = useAppSelector(
    (state) => state.articles.currentlySelectedArticle?.ratedArticle ?? false
  )
  const isUserLoggedIn: boolean = useAppSelector(
    (state) => state.user.isUserLoggedIn
  )
  return { article, didBuyArticle, didRateArticle, isUserLoggedIn }
}
