import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../store/hooks"
import { fetchArticleById } from "../../store/actions/ArticlesActions"
import { addArticleToCart } from "../../store/actions/OrderActions"
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/shared/components"
import { fetchRatingsByArticleId } from "../../store/actions/RatingsActions"
import { RatingsView } from "../../views"
import { DefaultRatingStar } from "../../components"
import {
  ArticleActionsContainer,
  ArticleImage,
  ArticleImagesContainer,
  ArticleInfoContainer,
  ArticleNameContainer,
  ArticlePageContainer,
  ArticleShortDescriptionContainer,
  ArticleVegiImage,
  TabsContainer,
  TabsContentContainer,
} from "./ArticleDetailStyles"
import { useArticleDetailInformations } from "./Hooks"

type ArticleOverviewParams = {
  articleId: string
}

interface ArticleDetailPageProps {
  startInRatingMode?: boolean
}

export function ArticleDetailPage({
  startInRatingMode,
}: ArticleDetailPageProps) {
  const dispatch = useAppDispatch()

  const [selectedTab, setSelectedTab] = useState("description")

  const { articleId } = useParams<ArticleOverviewParams>()

  const { article, didBuyArticle, didRateArticle, isUserLoggedIn } =
    useArticleDetailInformations()

  useEffect(() => {
    if (startInRatingMode) {
      setSelectedTab("ratings")
    }
  }, [])
  useEffect(() => {
    dispatch(fetchArticleById(articleId ?? ""))
    dispatch(fetchRatingsByArticleId(articleId ?? ""))
  }, [])

  const ingredientListItems = useMemo(
    () =>
      article?.ingredients[0].split(",").map((eachIngredient) => {
        return <li key={eachIngredient}>{eachIngredient}</li>
      }),
    [article]
  )

  const addArticleToCard = () => {
    if (article) {
      dispatch(addArticleToCart(article))
    }
  }
  const switchTab = (newValue: string) => {
    setSelectedTab(newValue)
  }

  return (
    <ArticlePageContainer>
      <ArticleImagesContainer>
        {article?.vegetarian && (
          <ArticleVegiImage
            src={require("../../images/vegetarian.png")}
            alt={"Could not load vegetarian checkmark"}
            title={"This item is vegetarian"}
          />
        )}
        <ArticleImage src={article?.href} alt={"Could not load image"} />
      </ArticleImagesContainer>
      <ArticleNameContainer>{article?.name}</ArticleNameContainer>
      <ArticleInfoContainer>
        <span>{article?.price}€</span>
        <DefaultRatingStar
          rating={article?.rating}
          isReadOnly
          showNumberOfRating
          numberOfRatings={article?.numberOfRatings ?? 0}
          action={() => switchTab("ratings")}
        />
      </ArticleInfoContainer>
      <ArticleShortDescriptionContainer>
        {article?.shortdescription}
      </ArticleShortDescriptionContainer>
      <ArticleActionsContainer>
        <Button
          onClick={addArticleToCard}
          colorVariant={"primary"}
          style={{ marginTop: "0.2em" }}
        >
          Add Article to cart
        </Button>
      </ArticleActionsContainer>
      <TabsContainer>
        <Tabs value={selectedTab} onValueChange={switchTab}>
          <TabsList>
            <TabsTrigger value={"description"}>Description</TabsTrigger>
            <TabsTrigger value={"ingredients"}>Ingredients</TabsTrigger>
            <TabsTrigger value={"ratings"}>Ratings</TabsTrigger>
          </TabsList>
          <TabsContent value={"ingredients"}>
            <TabsContentContainer>
              <ul>{ingredientListItems}</ul>
            </TabsContentContainer>
          </TabsContent>
          <TabsContent value={"ratings"}>
            <TabsContentContainer>
              <RatingsView
                didUserBuyArticle={didBuyArticle}
                isUserLoggedIn={isUserLoggedIn}
                didUserRateArticle={didRateArticle}
                articleId={article?._id ?? ""}
              />
            </TabsContentContainer>
          </TabsContent>
          <TabsContent value={"description"}>
            <TabsContentContainer>{article?.description}</TabsContentContainer>
          </TabsContent>
        </Tabs>
      </TabsContainer>
    </ArticlePageContainer>
  )
}
