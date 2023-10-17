import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./prepareHeader";
import { ENV } from "../constants/env.constant";
import { ROLES_LINK } from "../constants/routes";
import { Role, roleSchema } from "../types/role.type";

const ROLE_API_ENDPOINTS = {
  BASE_URL: "/",
  ROLE: ROLES_LINK,
};

type RoleResponse = Role[];

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({
    ...baseQueryWithRetry,
    baseUrl: `${ENV.VITE_API_URL}${ROLE_API_ENDPOINTS.BASE_URL}`,
  }),

  tagTypes: ["Roles"],

  endpoints: (build) => ({
    getRoles: build.query<RoleResponse, void>({
      query: () => ({
        url: ROLE_API_ENDPOINTS.ROLE,
      }),
      transformResponse: (rawData) => {
        const parsedData = roleSchema.array().parse(rawData);
        const sortedData = parsedData.sort((a, b) => b.id - a.id);
        return sortedData;
      },
      providesTags: ["Roles"],
    }),
    getRoleById: build.query<Role, number>({
      query: (id) => ({
        url: `${ROLE_API_ENDPOINTS.ROLE}/${id}`,
      }),
      transformResponse: (rowData) => {
        return roleSchema.parse(rowData);
      },
      providesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useLazyGetRoleByIdQuery,
} = roleApi;
