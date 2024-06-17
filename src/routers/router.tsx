import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/home/Home";

import BoardListPage from "../routes/board/BoardListPage";
import BoardWritePage from "../routes/board/BoardWritePage";
import BoardDetailPage from "../routes/board/BoardDetailPage";
import ProductListPage from "../routes/product/ProductListPage";
import ProductDetailPage from "../routes/product/ProductDetailPage";
import ReviewPage from "../routes/product/ReviewPage";
import RelatedBoardPage from "../routes/product/RelatedBoardPage";
import ReviewWritePage from "../routes/product/ReviewWritePage";
import HomePage from "../routes/home/Home";
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
import { Children } from "react";
// import ProductListPage from "../routes/ProductListPage";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/signin",
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/signup",
        children: [
          {
            path: "",
            index: true,
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
        path: "/asset",
        children: [
          {
            path: "",
            index: true,
            element: <AssetConnectPage />,
          },
          {
            path: "/loading",
            element: <AssetLoadingPage />,
          },
          {
            path: "/connect",
            element: <ConnectedAssetPage />,
          },
          {
            path: "/tendency",
            element: <TendencyAnalysisPage />,
          },
        ],
      },

      {
        path: "/challenge",
        Children: [
          {
            path: "",
            index: true,
            element: <ChallengePage />,
          },
          {
            path: "detail",
            element: <ChallengeDetailPage />,
          },
          {
            path: "calendar",
            element: <ChallengeCAL />,
          },
          {
            path: "stampboard",
            element: <StampBoard />,
          },
        ],
      },
      {
        path: "/board",
        children: [
          {
            path: "",
            index: true,
            element: <BoardListPage />,
          },
          {
            path: ":boardId",
            element: <BoardDetailPage />,
          },
          {
            path: "write",
            element: <BoardWritePage />,
          },
        ],
      },

      {
        path: "/productList",
        element: <ProductListPage />,
      },
      {
        path: "/productDetail",
        element: <ProductDetailPage />,
      },
      {
        path: "/mypage",
        element: <ProfilePage />,
      },
      {
        path: "/editprofile",
        element: <EditProfilePage />,
      },
      {
        path: "/reviewWrite",
        element: <ReviewWritePage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
