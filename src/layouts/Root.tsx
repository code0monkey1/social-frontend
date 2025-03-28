import { useEffect } from "react";
import { useAuthStore } from "../store";
import { self } from "../http/api"; // Assuming self is the API call to get user info
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
