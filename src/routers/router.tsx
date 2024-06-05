import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
import Navbar from "../routes/Navbar";

export const mainRouter = [
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Navbar />,
      },
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
