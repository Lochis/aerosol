import axios from "axios";
import { createContext, useContext, useState } from "react";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = `${process.env.CLIENT_API_BASE}`;
const SUB_KEY = "sub";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export type AuthData = {
  sub: string
  accessToken: string
  refreshToken: string
}

export class Auth {
  /**
   * An Axios client for our backend API. May or may not be authenticated.
   */
  client: AxiosInstance;

  private data: AuthData;
  private setData: (token: AuthData) => void;

  constructor(data: AuthData, setData: (data: AuthData) => void) {
    this.data = data;
    this.setData = setData;

    const headers = data ? { Authorization: data.accessToken } : {};
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: headers,
      timeout: 3000,
    });

    // https://stackoverflow.com/a/71412207
    this.client.interceptors.response.use(res => res, (error: AxiosError) => {
      const { response, config } = error
      if (!response || !config) return Promise.reject(error)
      if (response.status !== 401) return Promise.reject(error)
      if (!this.isAuthenticated()) return Promise.reject(error)

      console.log("Access token refused, refreshing token")
      return axios.post(`${config.baseURL}/refresh`, undefined, {
        timeout: config.timeout,
        headers: { Authorization: this.data.refreshToken },

      }).then((res: AxiosResponse) => {
        console.log("Successfully refreshed, retrying last request")
        this.saveAuthFromResponse(res)
        config.headers.set("Authorization", `${res.data.tokenType} ${res.data.accessToken}`)
        return axios.request(config)

      }).catch((_err: AxiosError) => {
        console.log("Failed to refresh token")
        // this.clearAuth() // Will kick the user out of protected routes
        return Promise.reject(error)
      })
    })
  }

  /**
   * Ensure the user is authenticated and return the Axios client.
   */
  get api(): AxiosInstance {
    if (!this.isAuthenticated()) throw new Error("INVALID_TOKEN");
    return this.client;
  }

  get me(): { _id: string } {
    return { _id: this.data.sub }
  }

  saveAuth(data: AuthData) {
    localStorage.setItem(SUB_KEY, data.sub);
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    this.setData(data);
  }

  saveAuthFromResponse(res: AxiosResponse) {
    this.saveAuth({
      sub: res.data.sub,
      accessToken: `${res.data.tokenType} ${res.data.accessToken}`,
      refreshToken: `${res.data.tokenType} ${res.data.refreshToken}`,
    });
  }

  clearAuth() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.setData({ sub: "", accessToken: "", refreshToken: "" });
  }

  isAuthenticated() {
    return !!this.data.sub;
  }
}
export const AuthContext = createContext<Auth | null>(null);
export const useAuth = () => useContext(AuthContext)!
export const useAuthData = () => useState<AuthData>({
  sub: localStorage.getItem(SUB_KEY) || "",
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || "",
})
