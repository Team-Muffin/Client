import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";
import BoardListPage from "../routes/Board/BoardListPage";
import BoardWritePage from "../routes/Board/BoardWritePage";
import BoardDetailPage from "../routes/Board/BoardDetailPage";
import ChallengePage from "../routes/ChallengePage";
import ChallengeDetailPage from "../routes/ChallengeDetailPage";
import ChallengeCAL from "../routes/ChallengeCAL";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import ProductListPage from "../routes/Product/ProductListPage";

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
      {
        path: "/productList",
        element: <ProductListPage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
