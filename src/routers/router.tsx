import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";

import BoardListPage from "../routes/board/BoardListPage";
import BoardWritePage from "../routes/board/BoardWritePage";
import BoardDetailPage from "../routes/board/BoardDetailPage";
import ProductListPage from "../routes/product/ProductListPage";
import ProductDetailPage from "../routes/product/ProductDetailPage";
import ReviewPage from "../routes/product/ReviewPage";
import RelatedBoardPage from "../routes/product/RelatedBoardPage";
import ReviewWritePage from "../routes/product/ReviewWritePage";

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
// import ProductListPage from "../routes/ProductListPage";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/signup/profile",
        element: <SignUpProfilePage />,
      },
      {
        path: "/signup/assetinfo",
        element: <AssetConnectPage />,
      },
      {
        path: "/signup/assetconnect",
        element: <AssetLoadingPage />,
      },
      {
        path: "/signup/connectedasset",
        element: <ConnectedAssetPage />,
      },
      {
        path: "/signup/tendency",
        element: <TendencyAnalysisPage />,
      },
      {
        path: "/signup/success",
        element: <SignUpSuccessPage />,
      },
      {
        path: "/challenge",
        element: <ChallengePage />,
      },
      {
        path: "/challenge/detail",
        element: <ChallengeDetailPage />,
      },
      {
        path: "/challenge/cal",
        element: <ChallengeCAL />,
      },
      {
        path: "/boardList",
        element: <BoardListPage />,
      },
      {
        path: "/boardDetail",
        element: <BoardDetailPage />,
      },
      {
        path: "/boardWrite",
        element: <BoardWritePage />,
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
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
