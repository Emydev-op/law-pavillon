import { resetAuth, setAuthUser } from "@/redux/features/auth/authSlice";
import Cookies from "js-cookie";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: user,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const {
            data: { data },
          } = result;
          Cookies.set("token", data?.token?.access_token);
          Cookies.set("refresh_token", data?.token?.refresh_token);
          // Passing entire data to setauthuser then seeding the user obj to store
          dispatch(setAuthUser(data));
        } catch {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/api/auth/logout`,
        method: "POST",
        // credentials: "include" as const
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.remove("token");
          window.location.href = "/login";
          dispatch(resetAuth());
          console.log(result);
        } catch (error) {
          console.log("Error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
