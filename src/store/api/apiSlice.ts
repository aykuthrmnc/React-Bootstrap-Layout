import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "~/store";
import { userLogoutHandle } from "~/store/apiHandle";

// apiSlice.injectEndpoints şeklinde parçalı kısımlara ayrılabilir.
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },

    validateStatus: (response: Response) => {
      switch (response.status) {
        case 401:
          userLogoutHandle();
          break;
      }
      return response?.ok;
    },
  }),
  tagTypes: ["EXAMPLE"],
  endpoints: (builder) => ({
    //! AUTH
    login: builder.mutation({
      query: (value) => ({
        url: "/login",
        method: "POST",
        body: value,
      }),
    }),
    register: builder.mutation({
      query: (value) => ({
        url: "/register",
        method: "POST",
        body: value,
      }),
    }),

    //! Example
    getExamples: builder.query<any, void>({
      query: () => "/examples",
      providesTags: ["EXAMPLE"],
    }),
    createExample: builder.mutation({
      query: (value) => ({
        url: "/example",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["EXAMPLE"],
    }),
    updateExample: builder.mutation({
      query: (value) => ({
        url: "/example",
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["EXAMPLE"],
    }),
    deleteExample: builder.mutation({
      query: (value) => ({
        url: `/example/${value}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EXAMPLE"],
    }),
  }),
});

export const {
  //! AUTH
  useLoginMutation,
  useRegisterMutation,

  //! Example
  useGetExamplesQuery,
  useCreateExampleMutation,
  useUpdateExampleMutation,
  useDeleteExampleMutation,
} = apiSlice;
