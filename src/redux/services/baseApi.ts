/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { resetAuth, setToken } from "../features/auth/authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { RootState } from "../features/root-reducer";
import { clearStorageItem } from "@/hooks/use-local-storage";

// Helper to get tokens from cookies
const getAccessToken = () => Cookies.get("token") || "";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  prepareHeaders: (headers, {}) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    headers.set("accept", "application/json");
    return headers;
  },
});

// Refresh token request
const refreshTokenRequest = async (refreshToken?: string) => {
  if (!refreshToken) return null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "x-refresh-token": refreshToken,
        },
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data?.data;
  } catch {
    return null;
  }
};

export const baseQueryInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error) {
    const res: any = result?.error;
    if (res?.status === 400) {
      if (res?.data?.message) {
        toast.error(res?.data?.message);
      }
    }
    if (res?.status === 401) {
      // Get the refresh token from the redux store
      const refreshToken = (api.getState() as RootState)?.auth?.token
        ?.refresh_token;

      // Try refresh token
      const refreshed = await refreshTokenRequest(refreshToken);

      if (
        refreshed?.message !== "Refresh token expired" &&
        refreshed?.token.access_token &&
        refreshed?.token.refresh_token
      ) {
        // Store new tokens
        Cookies.set("token", refreshed?.token.access_token);
        Cookies.set("refresh_token", refreshed?.token.refresh_token);
        api.dispatch(setToken(refreshed?.token)); // reset token in store

        // Retry original request with new token
        const retryResult = await baseQuery(args, api, extraOptions);
        // If still unauthorized, force logout
        if (retryResult?.error?.status === 401) {
          api.dispatch(resetAuth());
          Cookies.remove("token");
          Cookies.remove("refresh_token");
          clearStorageItem();
          window.location.href = "/login";
          return retryResult; // Return the failed retry result
        }
        // if i dont return this, the refetched data won't update on the hook
        return retryResult; // Return the failed retry result
      } else {
        // Refresh failed, force logout if we aren't under the login api
        const isAuthRoute =
          typeof args === "string"
            ? args.startsWith("/api/auth/login")
            : typeof args === "object" &&
              "url" in args &&
              typeof args.url === "string"
            ? args.url.startsWith("/api/auth/login")
            : false;
        if (isAuthRoute) {
          // Just show error for auth routes
          toast.error(res?.data?.message || "Authentication failed.");
        } else {
          // Force logout for non-auth routes
          console.log("second");
          api.dispatch(resetAuth());
          Cookies.remove("token");
          Cookies.remove("refresh_token");
          clearStorageItem();
          window.location.href = "/login";
        }
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryInterceptor,
  endpoints: () => ({}),
  reducerPath: "baseApi",
  tagTypes: ["Users", "Admin"],
});
