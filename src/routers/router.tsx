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
import Dogs from "../routes/Dogs";

export const mainRouter = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "signup",
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
          },
          {
            path: ":boardId/edit",
            element: <BoardWritePage />,
          },
        ],
      },
      {
        path: "product",
        element: <ProductListPage />,
      },
      {
        path: "productDetail",
        element: <ProductDetailPage />,
      },
      {
        path: "mypage",
        element: <ProfilePage />,
      },
      {
        path: "editprofile",
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
