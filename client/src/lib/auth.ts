import axios from "axios";
import { createContext, useContext, useState } from "react";
import type { AxiosInstance } from "axios";

const BASE_URL = `${process.env.CLIENT_API_BASE}`;
const accessTokenKey = "accessToken";

export class Auth {
  /**
   * An Axios client for our backend API. May or may not be authenticated.
   */
  client: AxiosInstance;

  private token: string;
  private setToken: (token: string) => void;

  constructor(token: string, setToken: (token: string) => void) {
    this.token = token;
    this.setToken = setToken;

    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: headers,
      timeout: 3000,
    });
  }

  /**
   * Ensure the user is authenticated and return the Axios client.
   */
  get api() : AxiosInstance {
    if (!this.isAuthenticated()) throw new Error("INVALID_TOKEN");
    return this.client;
  }

  saveToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
    this.setToken(token);
  }

  clearToken() {
    localStorage.removeItem(accessTokenKey);
    this.setToken("");
  }

  isAuthenticated() {
    return !!this.token;
  }
}
export const AuthContext = createContext<Auth | null>(null);
export const useAuth = () => useContext(AuthContext)!
export const useStateToken = () => useState(localStorage.getItem(accessTokenKey) || "")
