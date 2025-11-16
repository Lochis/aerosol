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
    return axios.request({ url: input, ...init, headers });
  } else {
    throw new Error("INVALID_TOKEN");
  }
}

{/* TODO: Add types to config */}
// helper methods to simplify usage of authFetch
export const authGet = (url: string, config?: any) => authFetch(url, { method: "get", ...config });
export const authPost = (url: string, data?: any, config?: any) => authFetch(url, { method: "post", data, ...config });
export const authPut = (url: string, data?: any, config?: any) => authFetch(url, { method: "put", data, ...config });
export const authDelete = (url: string, config?: any) => authFetch(url, { method: "delete", ...config });