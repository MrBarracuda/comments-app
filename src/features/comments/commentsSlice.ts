import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

type Comment = {
  id: number
  body: string
  user: {
    id: number
    username: string
    fullName: string
  }
}

type CommentsState = {
  comments: Comment[]
}

const initialState: CommentsState = {
  comments: [],
}

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      )
    },
    createComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    },
  },
})

export const selectAllComments = (state: { comments: CommentsState }) =>
  state.comments.comments
export const { setComments, deleteComment, createComment } =
  commentsSlice.actions
