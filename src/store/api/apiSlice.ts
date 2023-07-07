import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "~/store";
import { userLogoutHandle } from "~/utils";

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
      let message: any;
      if (response && response.status === 404) {
        message = response;
        // window.location.href = '/not-found';
      } else if (response && response.status === 403) {
        // window.location.href = '/access-denied';
        message = response;
      } else {
        switch (response.status) {
          case 401:
            message = "Yetki Yok";
            userLogoutHandle();
            break;
          case 403:
            message = "Access Forbidden";
            break;
          case 404:
            message = "Sorry! the data you are looking for could not be found";
            break;
          case 505:
            window.location.href = "/error-500";
            break;
          default: {
            message = response;
          }
        }
      }
      return message!;
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
