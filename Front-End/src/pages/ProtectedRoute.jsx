import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import Loading from "../components/Loading";

function ProtectedRoute() {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) return <Loading/>;
  if (!isAuth && !isLoading) return <Navigate replace to="/login" />;
  return <Outlet />;
}

export default ProtectedRoute;
