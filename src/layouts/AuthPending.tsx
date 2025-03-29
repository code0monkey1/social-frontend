import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

const AuthPending = () => {

  // check by sending tokens of logged in user

  const { user } = useAuthStore();

  // if the user is set in the zustand store, redirect to user home url
  // do not let them access the Login page again 

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthPending;