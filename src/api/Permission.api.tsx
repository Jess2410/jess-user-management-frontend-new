import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./prepareHeader";
import { Permission, permissionSchema } from "../types/permission.type";
import { ENV } from "../constants/env.constant";
import { PERMISSIONS_LINK } from "../constants/routes";

const PERMISSION_API_ENDPOINTS = {
  BASE_URL: "/",
  PERMISSION: PERMISSIONS_LINK,
};

type PermissionResponse = Permission[];

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: fetchBaseQuery({
    ...baseQueryWithRetry,
    baseUrl: `${ENV.VITE_API_URL}${PERMISSION_API_ENDPOINTS.BASE_URL}`,
  }),

  tagTypes: ["Permissions"],

  endpoints: (build) => ({
    getPermissions: build.query<PermissionResponse, void>({
      query: () => ({
        url: PERMISSION_API_ENDPOINTS.PERMISSION,
      }),
      providesTags: ["Permissions"],
      transformResponse: (rawData) => {
        const parsedData = permissionSchema.array().parse(rawData);
        const sortedData = parsedData.sort((a, b) => b.id - a.id);
        return sortedData;
      },
    }),
    getPermissionById: build.query<Permission, number>({
      query: (id) => ({
        url: `${PERMISSION_API_ENDPOINTS.PERMISSION}/${id}`,
      }),
      transformResponse: (rawData) => {
        return permissionSchema.parse(rawData);
      },
      providesTags: ["Permissions"],
    }),
  }),
});

export const {
  useGetPermissionsQuery,
  useLazyGetPermissionsQuery,
  useGetPermissionByIdQuery,
  useLazyGetPermissionByIdQuery,
} = permissionApi;
