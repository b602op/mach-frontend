import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (userData: any) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getUser: builder.query<{
      isAuth: boolean;
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
      } | null;
    }, void>({
      query: () => '/auth/me',
    }),
    // Для игры:
    createGame: builder.mutation({
      query: (gameData: any) => ({
        url: '/games',
        method: 'POST',
        body: gameData,
      }),
    }),
    getGame: builder.query({
      query: (gameId: any) => `/games/${gameId}`,
    }),
    
    // ... другие endpoints для игры
  }),
});

export const {
  useLogoutMutation,
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useCreateGameMutation,
  useGetGameQuery,
} = api;