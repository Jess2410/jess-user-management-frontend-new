import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

const prepareHeadersQuery = fetchBaseQuery({
  prepareHeaders: (headers) => {
    // By default, if we have a token in the local storage, let's use that for authenticated requests
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithRetry = retry(prepareHeadersQuery, { maxRetries: 6 });
