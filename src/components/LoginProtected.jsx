import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export const LoginProtected = ({ children, redirectTo = "/login" }) => {
  const [cookies] = useCookies(["userLogged"]);
  if (!cookies?.userLogged) {
    return <Navigate to={redirectTo} />;
  }
  return <Outlet />;
};
