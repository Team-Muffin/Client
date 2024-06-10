import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";
import PostList from "../routes/PostList";

import PostDetail from "../routes/PostDetail";
import ChallengePage from "../routes/ChallengePage";
import ChallengeDetailPage from "../routes/ChallengeDetailPage";
import ChallengeCAL from "../routes/ChallengeCAL";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
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
        element: <PostList />,
      },
      {
        path: "/postDetail",
        element: <PostDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
