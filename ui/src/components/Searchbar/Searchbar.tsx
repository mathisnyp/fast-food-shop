import React, { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  IconButton,
  TextField,
} from "../shared/components"
import { FaSearch } from "react-icons/fa"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useWindowSize } from "../../shared/Hooks/UseWindowSize"

export const filterParamsNames = {
  searchText: "searchText",
  categories: "categories",
  ingredients: "ingredients",
  vegetarianOnly: "vegetarianOnly",
}

interface SearchbarProps {
  windowWidth: number
}

export function Searchbar({ windowWidth }: SearchbarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchParams, setSearchParams] = useSearchParams()
  const size = useWindowSize()

  const [currentSearchText, setCurrentSearchText] = useState<string>(
    searchParams.get(filterParamsNames.searchText) ?? ""
  )

  const displaySearchBarAsDropdown = (windowWidth ?? 0) < 640

  const onSearchTextChange = (
    inputChangeEvent: React.FormEvent<HTMLInputElement>
  ) => {
    const adjustedSearchText = inputChangeEvent.currentTarget.value
    setCurrentSearchText(adjustedSearchText)
  }
  const handleKeyDown = async (
    keyDownEvent: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (keyDownEvent.key === "Enter") {
      if (currentSearchText.length > 0) {
        if (location.pathname === "/articles/search") {
          searchParams.set(filterParamsNames.searchText, currentSearchText)
          setSearchParams(searchParams)
        } else {
          navigate(
            `/articles/search?${filterParamsNames.searchText}=${currentSearchText}`
          )
        }
      } else {
        const searchUrlPart = `?${
          filterParamsNames.searchText
        }=${searchParams.get(filterParamsNames.searchText)}`
        if (location.search === searchUrlPart) {
          navigate("/articles")
        } else {
          searchParams.delete(filterParamsNames.searchText)
          setSearchParams(searchParams)
        }
      }
    }
  }

  return displaySearchBarAsDropdown ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton sizeVariant={{ "@initial": "md", "@bp3": "lg" }}>
          <FaSearch />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <TextField
          startFieldIcon={<FaSearch />}
          value={currentSearchText}
          onChange={onSearchTextChange}
          onKeyDown={handleKeyDown}
          isSearchBarVariant={true}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <TextField
      startFieldIcon={<FaSearch />}
      value={currentSearchText}
      onChange={onSearchTextChange}
      onKeyDown={handleKeyDown}
      isSearchBarVariant={true}
    />
  )
}
//
// fontSize: "2.5rem",
//   width: "25em",
//   height: "1.2em",
