import React from "react"
import { useNavigate } from "react-router-dom"
import { StyledLogoImg } from "./Logo"
import { Searchbar } from "../Searchbar/Searchbar"
import { Navbar } from "../NavBar/Navbar"
import {
  HeaderContainer,
  HeaderContentWrapper,
  PageTitleWrapper,
} from "./HeaderStyles"
import { useWindowSize } from "../../shared/Hooks/UseWindowSize"

export function Header(): JSX.Element {
  const navigate = useNavigate()
  const size = useWindowSize()
  //width is used for responsive rendering which requires rendering different components
  const width = size.width ?? 0

  return (
    <HeaderContainer>
      <HeaderContentWrapper>
        <PageTitleWrapper
          title={"Navigate to starting page"}
          onClick={() => {
            navigate("/")
          }}
        >
          <StyledLogoImg
            src={require("../../images/logo.png")}
            alt={"Could not find image"}
          />
        </PageTitleWrapper>
        <Searchbar windowWidth={width} />
        <Navbar windowWidth={width} />
      </HeaderContentWrapper>
    </HeaderContainer>
  )
}
