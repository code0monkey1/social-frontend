import axios from "axios";
import { useAuthStore } from "../store";


export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
   /* 
   It is very important to keep [withCredentials: true] true  as we are using cookie session , and if this 
   is not marked true, then the cookies won't be stored on the client browzer
   and the cookies will also be sent to the server with each request if withCredentials is marked true
   */
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


// refresh request is put here to avoid circular dependancy 
// explanation : if this request is put in client folder , and then the client folder's request is called in the 
export const refreshRequest = async () => {   
  // we create a new refreshRequest using axios , and not the api call defined, so as to preserve the 
  // previous error message request and it's headers 
  await axios.get(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    { 
      withCredentials: true, // to ensure that the cookies are sent with the request to the backend to get new acessToken and refreshToken in new cookies
    }
  );
};
/* 
you can use an axios api interceptor to  verify if the accessToken is invalid / expired ( you can use axios.interceptors.response.use() ) 
and stop the request to reach the client , and proceed to retry and refresh the token
to get a new accessToken and refreshToken using the refresh endpoint
*/

// Track retries using a Set to store request identifiers
const retrySet = new Set();

api.interceptors.response.use((response) => response,async (error) => { // we get the error in the attribute of the second param
    // we will see if the response is a 401 ( i.e accessToken was expired )

    const originalRequest = error.config; // this is the original request that was made, which led to rest response error

    // Create a unique identifier for this request
    const requestId = `${originalRequest.method}-${originalRequest.url}-${JSON.stringify(originalRequest.data || {})}`;
    
    if (error.response?.status === 401 && !retrySet.has(requestId)) {
      // if the response status is 401 and the original request was not retried
      // will trigger when accessToken is not supplied, or when jwt in the access token has expired
      // Mark this request as retried
      retrySet.add(requestId);
      console.log("accessToken is expired!! ")
      try {
        const originalHeaders = { ...originalRequest.headers }; // we get the original headers of the api request that failed

        // we need to make a refreshRequest , which does not involve the defined api instance call 
        // ( as it will lose the previous request information  [ self request ] )

        await refreshRequest(); // we make a request to the refresh endpoint to get a new accessToken and refreshToken 

        // now you can send  a new request using the valid tokens ( that have already been sent as cookies in the request )

        // we return the new request with the original headers

        // Clear the retry flag after successful refresh
        retrySet.delete(requestId);

        return api.request({
          ...originalRequest,
          headers: originalHeaders,
        });
      } catch (error) {
        // Clear the retry flag if refresh fails
        retrySet.delete(requestId);
        console.log("refresh token was not found");

        // logout the user from the frontend ( i.e delete tokens) if even the refresh token was not found on server side

        // zustand's getState() get's you the whole store object , from which you can call logout to clear the user information from the store
       
        useAuthStore.getState().logout();

        // this will result in an error state on the client , showing that the refreshToken was not found , and the user will have to login again !

        return Promise.reject(error);
      }
    }

    // if the response status is not 401 (i.e any other server error) or the error did not go away ever after a retry [ after new accessToken was obtained ] 
    // , we will return the error as normal
    return Promise.reject(error);
  }
);
