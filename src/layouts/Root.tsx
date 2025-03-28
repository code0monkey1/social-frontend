import { useEffect } from "react";
import { useAuthStore } from "../store";
import { self } from "../http/client"; // Assuming self is the API call to get user info
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};


 // This component does not render anything, fetches the user info fron the backend and sets it in the zustand store
const Root = () => {
  const { data,isLoading} = useQuery({
    queryKey: ["self"],
    queryFn: getSelf, 
    // handle the retry attempts if there is network connection , and handle for invalid / expired token case
    retry:(failureCount:number,error)=>{

      if(error instanceof AxiosError && error.response?.status===401){
        console.log("The is a 401 token failure , it's been handled don't retry 3 times")
        // if it's a refresh token call , don't retry it again and again , as it's already been handled
         return false;
      }
    console.log("failure count",failureCount)
    return failureCount<3;  
  },
  
  });
  
  const {setUser} = useAuthStore()

  console.log("User details fetched in root component",JSON.stringify(data,null,2))

  // if setUser is not inside useEffect with data and setUser dependencies, then it will go into infinite loop
  useEffect(()=>{
    if(data){
      setUser(data)
    }
  },[data,setUser])
 
  if(isLoading){
    return <h3>Loading...</h3>
  }

  return (
    <>
    <div style={{border:"yellow 2px solid"}}>Root Page</div>
      <Outlet />
    </>
  );

}

export default Root;
