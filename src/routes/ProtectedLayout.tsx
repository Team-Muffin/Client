import { Navigate, Outlet } from "react-router-dom";
import useAuth2Store from "../store/useAuth2Store";

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth2Store();

  if (isAuthenticated()) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return <Navigate to={"/signin"} />;
};

export default ProtectedLayout;
