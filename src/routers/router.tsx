import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import Home from "../routes/Home";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
