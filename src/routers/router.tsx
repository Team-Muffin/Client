import { createBrowserRouter } from "react-router-dom";
import Layout from "../routes/Layout";
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
    ],
  },
];

const router = createBrowserRouter(mainRouter);
export default router;
