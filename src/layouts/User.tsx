import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store";

const User = () => {
  // get the user details
  // if user is not present , redirect him to auth route

  const { user } = useAuthStore();

  if (user != null) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  return (
    <>
      {" "}
      <div>User Page</div>
      <Outlet />
    </>
  );
};

export default User;
