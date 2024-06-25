import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import BoardListPage from "../routes/board/BoardListPage";
import BoardWritePage from "../routes/board/BoardWritePage";
import BoardDetailPage from "../routes/board/BoardDetailPage";
import ProductListPage from "../routes/product/ProductListPage";
import ProductDetailPage from "../routes/product/ProductDetailPage";
import ReviewPage from "../routes/product/ReviewPage";
import RelatedBoardPage from "../routes/product/RelatedBoardPage";
import ReviewWritePage from "../routes/product/ReviewWritePage";
import HomePage from "../routes/home/HomePage";
import ChallengePage from "../routes/challenge/ChallengePage";
import ChallengeDetailPage from "../routes/challenge/ChallengeDetailPage";
import ChallengeCAL from "../routes/challenge/ChallengeCAL";
import LoginPage from "../routes/login/LoginPage";
import SignUpPage from "../routes/signup/SignUpPage";
import SignUpProfilePage from "../routes/signup/SignUpProfilePage";
import AssetConnectPage from "../routes/asset/AssetConnectPage";
import AssetLoadingPage from "../routes/asset/AssetLoadingPage";
import ConnectedAssetPage from "../routes/asset/ConnectedAssetPage";
import TendencyAnalysisPage from "../routes/signup/TendencyAnalysisPage";
import SignUpSuccessPage from "../routes/signup/SignUpSuccessPage";
import ProfilePage from "../routes/profile/ProfilePage";
import EditProfilePage from "../routes/profile/EditProfilePage";
import StampBoard from "../routes/challenge/StampBoard";
import Notification from "../routes/notification/NotificationPage";
import SearchPage from "../routes/search/SearchPage";
import SearchResultPage from "../routes/search/SearchResultPage";
import ProtectedLayout from "../routes/ProtectedLayout";
import { element } from "prop-types";

export const mainRouter = [
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <SignUpPage />,
      },
      {
        path: "profile",
        element: <SignUpProfilePage />,
      },
      {
        path: "success",
        element: <SignUpSuccessPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      { path: "searchResult", element: <SearchResultPage /> },
      { path: "notification", element: <Notification /> },
      {
        path: "asset",
        children: [
          {
            path: "",
            element: <AssetConnectPage />,
          },
          {
            path: "loading",
            element: <AssetLoadingPage />,
          },
          {
            path: "connect",
            element: <ConnectedAssetPage />,
          },
          {
            path: "tendency",
            element: <TendencyAnalysisPage />,
          },
        ],
      },
      {
        path: "challenge",
        children: [
          {
            path: "",
            element: <ChallengePage />,
          },
          {
            path: ":challengeId",
            element: <ChallengeDetailPage />,
          },
          {
            path: "calendar/:id",
            element: <ChallengeCAL />,
          },
          {
            path: "stampboard",
            element: <StampBoard />,
          },
        ],
      },
      {
        path: "board",
        children: [
          {
            path: "",
            element: <BoardListPage />,
          },
          {
            path: ":boardId",
            element: <BoardDetailPage />,
          },
          {
            path: "write",
            element: <BoardWritePage />,
            index: true,
          },

          {
            path: ":boardId/edit",
            element: <BoardWritePage />,
          },
          {
            path: "searchResult",
            element: <SearchResultPage />,
          },
        ],
      },

      {
        path: "product",
        children: [
          {
            path: "",
            index: true,
            element: <ProductListPage />,
          },
          {
            path: ":productId",
            element: <ProductDetailPage />,
          },
          {
            path: ":productId/related",
            element: <RelatedBoardPage />,
          },
          {
            path: "searchResult",
            element: <SearchResultPage />,
          },
        ],
      },

      {
        path: "userProfile",
        element: <ProfilePage />,
        index: true,
      },
      {
        path: "editProfile",
        element: <EditProfilePage />,
      },
      {
        path: "reviewWrite",
        element: <ReviewWritePage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
