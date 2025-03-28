//import { useQuery } from "@tanstack/react-query";
//import { useEffect } from "react";
import { Navigate, Outlet} from "react-router";
//import { self } from "../http/api";
import { useAuthStore } from "../store";
//import { AxiosError } from "axios";
//const getSelf = async () => {
//  const { data } = await self();
//  return data;
//};

const DashBoard = () => {
   // query for user credentials using the user cookies stored in the browzer 
   const {user} = useAuthStore();
   
   if(user==null){
    console.log(" Redirecting to /auth/login : The user is null")
    // the replace true is there to ensure that when you press back, you go to the previous page
    return <Navigate to="/auth/login" replace={true} />
   }


  // const { data, isLoading } = useQuery({
  //  queryKey: ["self"],
  //  queryFn: getSelf,
  //  // the retry function will only come into effect if the getSelf function throws an error ( maybe network error) 
  //  // but if the user comes out to be unauthenticated (401) or the failure count is 3 , then we'll stop retrying !  
  //  retry(failureCount, error) {

  //    // avoid retrying if the failure code is 401 ( in which case we'll use refresh token to get a new access token )
  //    if (error instanceof AxiosError && error.response?.status === 401) {
  //      return false;
  //    }
  //    // we automatically get failureCount value as a param in retry, 
  //    // also the error which lead to the failure of the initial api call which triggere retry
  //    return failureCount < 3;
  //  },
  //});

  //useEffect(() => {
  //  if (data) {
  //    setUser(data);
  //  }
  //}, [data, setUser]);


  //if (isLoading) {
  //  return <h2>Loading...</h2>;
  //}


  return (
    <>
    <div style={{border:"blue 2px solid"}}>DashBoard Page</div>
      <Outlet />
    </>
  );
};

export default DashBoard;
