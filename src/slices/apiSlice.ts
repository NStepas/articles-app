import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['article'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (searchTerm) => ({
        url: searchTerm ? `/article?search=${searchTerm}` : `/article`,
        method: 'GET',
      }),
      providesTags: ['article'],
    }),
    getOneArticle: builder.query({
      query: (id) => `/article/${id}`,
      providesTags: ['article'],
    }),
    addArticle: builder.mutation({
      query: (payload) => ({
        url: '/article',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      }),
      invalidatesTags: ['article'],
    }),
    updateArticle: builder.mutation({
      query: (payload) => {
        return {
          url: `/article/${payload.id}`,
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        };
      },
      invalidatesTags: ['article'],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: id,
      }),
      invalidatesTags: ['article'],
    }),
    getUser: builder.query({
      query: ({ id }) => `/user/${id}`,
    }),
    signUp: builder.mutation({
      query: (user) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (payload) => {
        return { url: '/auth/login', method: 'POST', body: payload };
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetOneArticleQuery,
  useUpdateArticleMutation,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useGetUserQuery,
  useSignUpMutation,
  useLoginMutation,
} = apiSlice as any;
