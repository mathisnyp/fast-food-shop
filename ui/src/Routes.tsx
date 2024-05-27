import React from "react"
import { Navigate, Route, Routes as DefaultRoutes } from "react-router-dom"
import {
  ArticleDetailPage,
  ArticleOverview,
  AuthPage,
  DetailedCartPage,
  OrderConfirmationPage,
  PaymentPage,
  ProfilePage,
} from "./pages"
import { PageContentsContainer } from "./shared/styles/stitches/PageContentsContainer"
import { RequireAuth } from "./components/shared/components"
import { Logout } from "./components"

interface AppRouteProps {
  children: JSX.Element
}

function Routes({ children }: AppRouteProps) {
  return (
    <>
      {children}
      <PageContentsContainer>
        <DefaultRoutes>
          {profileRoutes}
          {checkoutRoutes}
          <Route path={""} element={<ArticleOverview />} />
          {singleArticleRoutes}
          {articleRoutes}
          {authRoutes}
          <Route path={"*"} element={<Navigate to={"/"} replace />} />
        </DefaultRoutes>
      </PageContentsContainer>
    </>
  )
}

const singleArticleRoutes = (
  <>
    <Route
      path={"article/:articleId"}
      element={
        <ArticleDetailPage startInRatingMode={false} key={"viewArticleRoute"} />
      }
    />
    <Route
      path={"article/:articleId/ratings"}
      element={
        <ArticleDetailPage startInRatingMode={true} key={"rateArticleRoute"} />
      }
    />
  </>
)

const authRoutes = (
  <>
    <Route
      path={"register"}
      element={<AuthPage isUserSigningUp={true} key={"registerRoute"} />}
    />
    <Route
      path={"login"}
      element={<AuthPage isUserSigningUp={false} key={"loginRoute"} />}
    />
    <Route
      path={"logout"}
      element={
        <RequireAuth>
          <Logout />
        </RequireAuth>
      }
    />
  </>
)

const articleRoutes = (
  <Route path={"articles"}>
    <Route path={""} element={<ArticleOverview />} />
    <Route path={"search"} element={<ArticleOverview />} />
    <Route path={"*"} element={<Navigate to={"/articles"} replace />} />
  </Route>
)

const profileRoutes = (
  <Route path={"profile"}>
    <Route
      path={""}
      element={
        <RequireAuth>
          <ProfilePage openedView={"overview"} key={"profileOverview"} />
        </RequireAuth>
      }
    />
    <Route
      path={"edit"}
      element={
        <RequireAuth>
          <ProfilePage openedView={"edit"} key={"profileEdit"} />
        </RequireAuth>
      }
    />
    <Route
      path={"orders"}
      element={
        <RequireAuth>
          <ProfilePage openedView={"orders"} key={"profileOrderHistory"} />
        </RequireAuth>
      }
    />
    <Route path={"*"} element={<Navigate to={"/profile"} replace />} />
  </Route>
)

const checkoutRoutes = (
  <Route path={"checkout"}>
    <Route index element={<Navigate to={"/checkout/cart"} replace />} />
    <Route path={"cart"} element={<DetailedCartPage />} />
    <Route
      path={"pay"}
      element={
        <RequireAuth>
          <PaymentPage />
        </RequireAuth>
      }
    />
    <Route
      path={"confirmation"}
      element={
        <RequireAuth>
          <OrderConfirmationPage />
        </RequireAuth>
      }
    />
    <Route path={"*"} element={<Navigate to={"/checkout/cart"} replace />} />
  </Route>
)

export default Routes
