import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Comment = {
  id: number
  body: string
  user: {
    id: number
    username: string
    fullName: string
  }
}

type CommentsApiResponse = {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

const commentsApiUrl = import.meta.env.VITE_API_URL

export const commentsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: commentsApiUrl }),
  reducerPath: "commentsApi",
  tagTypes: ["Comments"],
  endpoints: build => ({
    getComments: build.query<CommentsApiResponse, number>({
      query: (limit = 10) => `?limit=${limit}`,
      providesTags: (result, error, id) => [{ type: "Comments", id }],
    }),
  }),
})

export const { useGetCommentsQuery, useLazyGetCommentsQuery } = commentsApiSlice
