//Auth Service

import { Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/self");

export const logoutFromServer = () => api.post("/auth/logout");
