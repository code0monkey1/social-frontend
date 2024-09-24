import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// you can use an axios interceptor to  verify that if the accessToken is invalid / expired ( you can use axios.interceptors.response.use() ) , and stop the request to reach the client , and proceed to retry and refresh the token, to get a new accessToken and refreshToken using the refresh endpoint
export const refreshRequest = async () => {
  // we will use plane axios for this
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // we will see if the response is a 401 ( i.e accessToken was expired )

    const originalRequest = error.config; // this is the original request that was made

    if (error.response.status === 401 && !originalRequest._retry) {
      // if the response status is 401 and the original request was not retried
      originalRequest._retry = true; // we set the _retry property to true

      try {
        const originalHeaders = { ...originalRequest.headers }; // we get the original headers

        // we need to make a refreshRequest , which does not involve the defined api instance call ( as it will lose the previous request information  [ self request ] )

        await refreshRequest(); // we make a request to the refresh endpoint to get a new accessToken and refreshToken

        // now you can send  a new request using the valid tokens ( that have already been sent as cookies in the request )

        // we return the new request with the original headers
        return api.request({
          ...originalRequest,
          headers: originalHeaders,
        });
      } catch (error) {
        console.log("refresh token was not found");

        // logout the user from the frontend ( i.e delete tokens) if even the refresh token was not found on server side

        // getState() get's you the whole store object , from which you can call logout to clear the user information from the store
        useAuthStore.getState().logout();

        // this will result in an error state on the client , showing that the refreshToken was not found , and the user will have to login again !

        return Promise.reject(error);
      }
    }

    // if the response status is not 401 (i.e any other server error) , we will return the error as normal
    return Promise.reject(error);
  }
);
