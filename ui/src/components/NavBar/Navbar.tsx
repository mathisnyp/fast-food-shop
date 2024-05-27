import React from "react"
import { useNavigate } from "react-router-dom"
import { CartOverview } from "../Cart"
import { useAppSelector } from "../../store/hooks"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuTriggerItem,
  IconButton,
  Separator,
} from "../shared/components"
import { FaUser } from "react-icons/fa"
import { NavbarWrapper } from "./NavBarStyles"

interface NavbarProps {
  windowWidth: number
}

export function Navbar({ windowWidth }: NavbarProps) {
  const navigate = useNavigate()
  const isUserLoggedIn = useAppSelector((state) => state.user.isUserLoggedIn)

  const notLoggedInItems = (
    <>
      <DropdownMenuItem onClick={() => navigate("/login")}>
        Login
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => navigate("/register")}>
        Register
      </DropdownMenuItem>
    </>
  )
  const loggedInItems = (
    <DropdownMenuItem onClick={() => navigate("/logout")}>
      Logout
    </DropdownMenuItem>
  )

  return (
    <>
      <NavbarWrapper>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton sizeVariant={{ "@initial": "md", "@bp3": "lg" }}>
              <FaUser />
            </IconButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={5}>
            {isUserLoggedIn ? loggedInItems : notLoggedInItems}
            <Separator />
            <DropdownMenu>
              <DropdownMenuTriggerItem>Profile</DropdownMenuTriggerItem>
              <DropdownMenuContent sideOffset={2} alignOffset={-5}>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Overview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile/edit")}>
                  Edit Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenuItem onClick={() => navigate("/profile/orders")}>
              My orders
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CartOverview windowWidth={windowWidth} />
      </NavbarWrapper>
    </>
  )
}
