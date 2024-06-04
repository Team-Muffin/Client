// import "./App.css";
import { RouterProvider } from "react-router-dom";
import routerComponent from "./routers/router";

function App() {
  return (
    <>
      <RouterProvider router={routerComponent} />
    </>
  );
}

export default App;
