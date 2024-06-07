import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import Home from "../routes/Home";
import Post from "../routes/Post";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
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
