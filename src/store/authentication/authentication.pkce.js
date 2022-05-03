import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pkceApi = createApi({
  reducerPath: 'pkceApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pkce-service.herokuapp.com' }),
  endpoints: (builder) => ({
    getPkceChallenge: builder.query({
      query: () => "/pkce",
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPkceChallengeQuery } = pkceApi