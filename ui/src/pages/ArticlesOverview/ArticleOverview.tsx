import React, { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import {
  fetchArticles,
  fetchArticlesByCategoryIds,
  fetchCategories,
} from "../../store/actions/ArticlesActions"
import { Article } from "../../api/dto"
import { isNil } from "lodash"
import { ArticleCard } from "../../components"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import Select, { ActionMeta, MultiValue } from "react-select"
import { filterParamsNames } from "../../components/Searchbar/Searchbar"
import { HashMap } from "../../shared/utils/HashMap"
import { IconButton, Separator } from "../../components/shared/components"
import { MdFormatClear } from "react-icons/md"
import {
  ArticlesContainer,
  CategoriesFilterContainer,
  FiltersLine,
  IngredientsFilterContainer,
  OverviewContainer,
  SelectContainer,
  VegiFilterContainer,
} from "./ArticleOverviewStyles"

interface BasicOption {
  readonly value: string
  readonly label: string
}

const desiredLocation = "/articles/search"

export function ArticleOverview() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<BasicOption[]>(
    []
  )
  const [selectedIngredients, setSelectedIngredients] = useState<BasicOption[]>(
    []
  )
  const [vegetarianOnly, setVegetarianOnly] = useState(false)

  const location = useLocation()
  const categories = useAppSelector((state) => state.articles.categories)
  const articles: (Article | null | undefined)[] = useAppSelector((state) =>
    Object.values(state.articles.currentlyFilteredArticlesIdToArticleMap ?? {})
  )
  const ingredients = useAppSelector(
    (state) => state.articles.availableIngredients
  )

  useEffect(() => {
    //Extract filtered ingredients from Url Params to set them in select box
    const filteredCategories: string[] = searchParams.getAll(
      filterParamsNames.categories
    )
    const filteredIngredients: BasicOption[] = searchParams
      .getAll(filterParamsNames.ingredients)
      .map((eachIngredient) => {
        return {
          value: eachIngredient,
          label: eachIngredient,
        }
      })
    setSelectedIngredients(filteredIngredients)
    setVegetarianOnly(
      searchParams.get(filterParamsNames.vegetarianOnly) === "true"
    )
    //Filter categories by using api endpoints
    if (filteredCategories.length > 0) {
      dispatch(fetchArticlesByCategoryIds(filteredCategories))
    } else {
      dispatch(fetchArticles())
      setSelectedCategories([])
    }
  }, [searchParams])
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  useEffect(() => {
    //Map selected Categories from ulr params to set them in select field
    const categoriesLabelMap: HashMap<string> = {}
    categoryOptions?.forEach((eachOption) => {
      categoriesLabelMap[eachOption.value] = eachOption.label
    })
    const selected = searchParams
      .getAll(filterParamsNames.categories)
      .map((eachCategoryId) => {
        return {
          value: eachCategoryId,
          label: categoriesLabelMap[eachCategoryId],
        }
      })
    setSelectedCategories(selected)
  }, [categories])

  const selectedIngredientsMap = useMemo(() => {
    const result: HashMap<string> = {}
    selectedIngredients.forEach((eachIngredient) => {
      result[eachIngredient.value] = eachIngredient.value
    })
    return result
  }, [selectedIngredients])
  const filteredArticles = useMemo(
    () =>
      articles.filter((eachArticle) => {
        //Apply selected Ingredient, vegetarian and searchText filters to articles
        const name = eachArticle?.name?.toUpperCase() ?? ""
        const searchingFor =
          searchParams.get(filterParamsNames.searchText)?.toUpperCase() ?? ""
        const doesContainFilteredIngredient =
          selectedIngredients.length > 0
            ? eachArticle?.ingredients[0].split(",").find((eachIngredient) => {
                return !isNil(selectedIngredientsMap[eachIngredient])
              }) !== undefined
            : true
        const doesApplyToVegeFilter = vegetarianOnly
          ? eachArticle?.vegetarian
          : true
        return (
          name.includes(searchingFor) &&
          doesContainFilteredIngredient &&
          doesApplyToVegeFilter
        )
      }),
    [articles]
  )
  const categoryOptions = useMemo(
    //Map all available categories to options
    () =>
      categories?.map((eachCategory) => {
        return {
          value: eachCategory._id,
          label: eachCategory.name,
        } as BasicOption
      }),
    [categories]
  )
  const articleDivs = useMemo(
    () =>
      filteredArticles.map((eachArticle) => {
        if (!isNil(eachArticle)) {
          return <ArticleCard article={eachArticle} key={eachArticle._id} />
        }
      }),
    [filteredArticles]
  )
  const ingredientOptions = useMemo(() => {
    //Map all available ingredients to ingredient options
    return Object.values(ingredients).map((eachIngredient) => {
      return {
        label: eachIngredient,
        value: eachIngredient,
      }
    })
  }, [])

  const onFilteredCategoriesChanged = (
    newValue: MultiValue<BasicOption>,
    actionMeta: ActionMeta<BasicOption>
  ) => {
    setSelectedCategories([...newValue])
  }
  const onFilteredIngredientsChanged = (
    newValue: MultiValue<BasicOption>,
    actionMeta: ActionMeta<BasicOption>
  ) => {
    setSelectedIngredients([...newValue])
  }
  const onApplyFilters = async () => {
    const desiredLocation = "/articles/search"
    //delete search params to prevent doublets
    searchParams.delete(filterParamsNames.categories)
    //set selected categories as search params
    selectedCategories.forEach((eachCategory) => {
      searchParams.append(filterParamsNames.categories, eachCategory.value)
    })
    searchParams.delete(filterParamsNames.ingredients)
    selectedIngredients.forEach((eachIngredient) => {
      searchParams.append(filterParamsNames.ingredients, eachIngredient.value)
    })
    if (location.pathname !== desiredLocation) {
      //if the user is still on the landing page navigate him to articles search
      navigate({
        pathname: desiredLocation,
        search: searchParams.toString(),
      })
    } else {
      //else just dynamically adjust params
      setSearchParams(searchParams)
    }
  }
  const applyVegiFilter = (isVegetarianOnly: boolean) => {
    searchParams.set(
      filterParamsNames.vegetarianOnly,
      isVegetarianOnly ? "true" : "false"
    )
    if (location.pathname !== desiredLocation) {
      navigate({
        pathname: desiredLocation,
        search: searchParams.toString(),
      })
    } else {
      setSearchParams(searchParams)
    }
  }

  return (
    <OverviewContainer>
      <FiltersLine>
        <CategoriesFilterContainer>
          <label>Categories</label>
          <SelectContainer>
            <Select
              closeMenuOnSelect={false}
              isMulti={true}
              value={selectedCategories}
              onChange={onFilteredCategoriesChanged}
              onMenuClose={onApplyFilters}
              options={categoryOptions}
            />
          </SelectContainer>
        </CategoriesFilterContainer>
        <VegiFilterContainer>
          <label>Vegetarian Only</label>
          <SelectContainer>
            <input
              type={"checkbox"}
              checked={vegetarianOnly}
              onChange={async () => {
                const isVegi = !vegetarianOnly
                setVegetarianOnly(isVegi)
                applyVegiFilter(isVegi)
              }}
            />
          </SelectContainer>
        </VegiFilterContainer>
        <IngredientsFilterContainer>
          <label>Ingredients</label>
          <SelectContainer>
            <Select
              closeMenuOnSelect={false}
              isMulti={true}
              value={selectedIngredients}
              onChange={onFilteredIngredientsChanged}
              onMenuClose={onApplyFilters}
              options={ingredientOptions}
              styles={{
                control: (_) => ({
                  ..._,
                  maxWidth: "20em",
                }),
              }}
            />
          </SelectContainer>
        </IngredientsFilterContainer>
        <IconButton
          onClick={() => navigate("/articles")}
          title={"Clear all filters"}
          style={{ gridColumn: "2", gridRow: "2" }}
        >
          <MdFormatClear />
        </IconButton>
      </FiltersLine>
      <Separator />
      <ArticlesContainer>{articleDivs}</ArticlesContainer>
    </OverviewContainer>
  )
}
