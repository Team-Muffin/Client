import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";
import BoardListPage from "../routes/BoardListPage";
import BoardWritePage from "../routes/BoardWritePage";
import BoardDetailPage from "../routes/BoardDetailPage";
import ChallengePage from "../routes/ChallengePage";
import ChallengeDetailPage from "../routes/ChallengeDetailPage";
import ChallengeCAL from "../routes/ChallengeCAL";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import SignUpProfilePage from "../routes/SignUpProfilePage";
import AssetConnectPage from "../routes/AssetConnectPage";
import AssetLoadingPage from "../routes/AssetLoadingPage";
import ConnectedAssetPage from "../routes/ConnectedAssetPage";
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
        path: "",
        element: <ChallengePage />,
      },
      {
        path: "/challenge",
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
      // {
      //   path: "/productList",
      //   element: <ProductListPage />,
      // },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
