import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";
import PostListPage from "../routes/PostListPage";
import PostWritePage from "../routes/PostWritePage";
import PostDetailPage from "../routes/PostDetailPage";
import ChallengePage from "../routes/ChallengePage";
import ChallengeDetailPage from "../routes/ChallengeDetailPage";
import ChallengeCAL from "../routes/ChallengeCAL";
import LoginPage from "../routes/LoginPage";
import SignUpPage from "../routes/SignUpPage";
import SignUpProfilePage from "../routes/SignUpProfilePage";

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
        path: "/post",
        element: <PostListPage />,
      },
      {
        path: "/postDetail",
        element: <PostDetailPage />,
      },
      {
        path: "/postWrite",
        element: <PostWritePage />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
