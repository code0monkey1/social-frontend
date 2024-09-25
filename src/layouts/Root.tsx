import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { AxiosError } from "axios";

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
    retry(failureCount, error) {
      // avoid retrying if the failure code is 401 ( in which case we'll use refresh token to get a new access token )

      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
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
      <Outlet />
    </>
  );
};

export default Root;
