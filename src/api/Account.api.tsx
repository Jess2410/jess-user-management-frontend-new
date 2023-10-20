import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./prepareHeader";
import { ENV } from "../constants/env.constant";
import {
  Account,
  AccountSchemaResponseType,
  accountSchema,
} from "../types/account.type";

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
    addAccount: build.mutation<AccountSchemaResponseType, Account>({
      query: (account) => ({
        url: ACCOUNT_API_ENDPOINTS.ACCOUNT,
        method: "POST",
        body: account,
      }),
      invalidatesTags: ["Accounts"],
      // transformResponse: (rowData) => accountSchema.parse(rowData),
    }),
    updateAccountById: build.mutation<Account, Account>({
      query: (account) => ({
        url: `${ACCOUNT_API_ENDPOINTS.ACCOUNT}/${account.id}`,
        method: "PATCH",
        body: account,
      }),
      invalidatesTags: ["Accounts"],
      transformResponse: (rowData) => accountSchema.parse(rowData),
    }),
    deleteAccountById: build.mutation<AccountSchemaResponseType, number>({
      query: (accountId) => ({
        url: `${ACCOUNT_API_ENDPOINTS.ACCOUNT}/${accountId}`,
        method: "DELETE",
        body: accountId,
      }),
      invalidatesTags: ["Accounts"],
      // transformResponse: (rowData) => accountSchema.parse(rowData),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountByIdQuery,
  useLazyGetAccountByIdQuery,
  useAddAccountMutation,
  useUpdateAccountByIdMutation,
  useDeleteAccountByIdMutation,
} = accountApi;
