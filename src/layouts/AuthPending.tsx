import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

const AuthPending = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/user/home" replace={true} />;
  }

  return (
    <>
      <div>AuthPending</div>
      <Outlet />
    </>
  );
};

export default AuthPending;
