import { Outlet } from "react-router";

const User = () => {
  return (
    <>
      {" "}
      <div>User Page</div>
      <Outlet />
    </>
  );
};

export default User;
