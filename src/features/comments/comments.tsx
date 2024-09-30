import { useLazyGetCommentsQuery } from "./commentsApiSlice"
import { Comment } from "@/features/comments/comment"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  selectAllComments,
  setComments,
} from "@/features/comments/commentsSlice"
import { useEffect } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CreateCommentModal } from "@/features/comments/create-comment-modal"

export function Comments() {
  const [fetchComments, { data, isError, isLoading, isSuccess }] =
    useLazyGetCommentsQuery()
  const dispatch = useAppDispatch()
  const comments = useAppSelector(selectAllComments)

  const handleFetchComments = () => {
    fetchComments(25)
  }

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setComments(data.comments))
    }
  }, [data, dispatch, isSuccess])

  if (isError) {
    return <h1>There was an error!!!</h1>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <div className="absolute top-0 left-0">
        <button
          className={cn(buttonVariants({ variant: "default" }))}
          onClick={handleFetchComments}
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : "Fetch Comments"}
        </button>

        <CreateCommentModal />
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {comments.length > 0 &&
          comments.map(({ body, id, user }) => (
            <Comment
              key={id}
              text={body}
              id={id}
              userFullName={user.fullName}
            />
          ))}
      </section>
    </>
  )
}
