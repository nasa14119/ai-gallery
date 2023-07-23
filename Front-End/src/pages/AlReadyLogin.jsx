import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Loading from "../components/Loading";

function AlReadyLogin() {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return <Loading/>;
  if (!isAuth && !isLoading) return <Outlet />;
  return <Navigate replace to="/dashboard" />;
}

export default AlReadyLogin;
