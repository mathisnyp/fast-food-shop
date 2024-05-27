import React, { useEffect, useState } from "react"
import { EditProfileView, OrderHistory, ProfileView } from "../../components"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/shared/components"
import { ProfilePageContainer } from "./ProfilePageStyles"

interface ProfilePageProps {
  openedView: "overview" | "edit" | "orders"
}

export function ProfilePage({ openedView }: ProfilePageProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    setSelectedTab(openedView)
  }, [])

  const changeTabSelection = (value: string) => {
    setSelectedTab(value)
    if (value === "edit") {
      window.history.pushState(null, "edit", "/profile/edit")
    } else if (value === "orders") {
      window.history.pushState(null, "edit", "/profile/orders")
    } else {
      window.history.pushState(null, "edit", "/profile")
    }
    return
  }

  return (
    <ProfilePageContainer>
      <Tabs value={selectedTab} onValueChange={changeTabSelection}>
        <TabsList>
          <TabsTrigger value={"overview"}>Profile Overview</TabsTrigger>
          <TabsTrigger value={"edit"}>Edit Profile</TabsTrigger>
          <TabsTrigger value={"orders"}>Order History</TabsTrigger>
        </TabsList>
        <TabsContent value={"overview"}>
          <ProfileView />
        </TabsContent>
        <TabsContent value={"edit"}>
          <EditProfileView />
        </TabsContent>
        <TabsContent value={"orders"}>
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </ProfilePageContainer>
  )
}
