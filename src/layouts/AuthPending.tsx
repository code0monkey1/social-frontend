import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

const AuthPending = () => {
  // check by sending tokens of logged in user

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
