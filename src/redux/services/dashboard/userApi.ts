/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateQueryString } from "@/utils/helpers";
import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: (params) => ({
        url: `/admin/users${generateQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (data: any) => data?.data,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllClientsQuery } = userApi;
