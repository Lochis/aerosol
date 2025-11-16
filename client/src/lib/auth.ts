import axios, { AxiosHeaders } from "axios";

const accessTokenKey = "accessToken";

export const saveToken = (token: string) => {
  localStorage.setItem(accessTokenKey, token);
};

export const getToken = () => localStorage.getItem(accessTokenKey);

export const clearToken = () => localStorage.removeItem(accessTokenKey);

export async function authFetch(input: string, init: any) {
  const token = getToken();

  // no token test / invalid token
  // token = null;
 
  const headers = new AxiosHeaders(init?.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
    return axios.get(input, { ...init, headers });
  } else {
    throw new Error("INVALID_TOKEN");
  }
}