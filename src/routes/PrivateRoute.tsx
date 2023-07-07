import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "~/store";

const PrivateRoute = ({ children }: { children?: React.ReactNode }): any => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace={true} state={{ return_url: location.pathname }} />;
  }

  return children;
};

export default PrivateRoute;
