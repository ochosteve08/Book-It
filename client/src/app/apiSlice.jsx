/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signInSuccess, signOut } from "../features/user/UserSlice";
import { BASE_URL } from "../../Config";

const basequery = fetchBaseQuery({
    baseUrl:`${BASE_URL}`,
    credentials: 'include',
    prepareHeaders: (headers, {getState})=>{
        const token = getState().user.token;
         if (token) {
           headers.set("authorization", `Bearer ${token}`);
         }
         return headers;
    }
})
