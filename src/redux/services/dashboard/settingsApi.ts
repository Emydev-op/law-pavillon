import { baseApi } from "../baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admin/admins",
        method: "GET",
      }),
      transformResponse: (data: any) => data?.data,
      providesTags: ["Admin"],
    }),
    createAdmin: builder.mutation({
      query: (user) => ({
        url: `/admin/register`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useCreateAdminMutation, useGetAllAdminQuery } = settingsApi;
