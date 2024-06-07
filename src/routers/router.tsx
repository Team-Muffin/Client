import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";

import Home from "../routes/Home";
import Post from "../routes/Post";

import ChallengePage from "../routes/ChallengePage";


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
        path: "/post",
        element: <Post />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
