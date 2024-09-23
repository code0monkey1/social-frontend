import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { self } from "../http/api";
import { useAuthStore } from "../store";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  //check if user is already signed in
  //if yes , redirect to user page
  const { setUser } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <div>Route </div>
      <Outlet />
    </>
  );
};

export default Root;
