import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthToken } from "../../services/auth/auth";
import { setData } from "../reducers/UserReducer";
import { setAuth } from "../reducers/authReducer";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5164/api/Auth/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "Register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "Login",
        method: "POST",
        responseHandler: (res) => res.text(),
        body: userData,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const { data } = await queryFulfilled;
          const userData = setAuthToken(data);
          dispatch(
            setData({
              email: userData.email,
              id: userData.nameid,
              userName: userData.unique_name,
              role: userData.role,
            })
          );
          dispatch(setAuth(true));
        } catch (err) {
          return;
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
