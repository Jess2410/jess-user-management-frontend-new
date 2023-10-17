import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./prepareHeader";
import { ENV } from "../constants/env.constant";
import { Account, accountSchema } from "../types/account.type";

const ACCOUNT_API_ENDPOINTS = {
  BASE_URL: "/",
  ACCOUNT: "/users",
};

type AccountResponse = Account[];

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    ...baseQueryWithRetry,
    baseUrl: `${ENV.VITE_API_URL}${ACCOUNT_API_ENDPOINTS.BASE_URL}`,
  }),
  tagTypes: ["Accounts"],

  endpoints: (build) => ({
    getAccounts: build.query<AccountResponse, void>({
      query: () => ({
        url: ACCOUNT_API_ENDPOINTS.ACCOUNT,
      }),
      transformResponse: (rawData) => {
        const parsedData = accountSchema.array().parse(rawData);
        const sortedData = parsedData.sort((a, b) => b.id - a.id);
        return sortedData;
      },
      providesTags: ["Accounts"],
    }),
    getAccountById: build.query<Account, number>({
      query: (id) => ({
        url: `${ACCOUNT_API_ENDPOINTS.ACCOUNT}/${id}`,
      }),
      providesTags: ["Accounts"],
      transformResponse: (rawData) => {
        return accountSchema.parse(rawData);
      },
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountByIdQuery,
  useLazyGetAccountByIdQuery,
} = accountApi;
