import { Comments } from "./features/comments/comments"
import { useLazyGetCommentsQuery } from "@/features/comments/comments-api-slice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  selectAllComments,
  setComments,
} from "@/features/comments/comments-slice"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CreateCommentModal } from "@/features/comments/create-comment-modal"

export default function App() {
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

  return (
    <div className="container mx-auto py-14">
      <div className="flex flex-col gap-4 space-y-3">
        <div className="space-x-4">
          <button
            className={cn(buttonVariants({ variant: "default" }))}
            onClick={handleFetchComments}
            disabled={isLoading}
          >
            {isLoading ? "Fetching..." : "Fetch Comments"}
          </button>
          <CreateCommentModal />
        </div>
        <Comments comments={comments} isError={isError} isLoading={isLoading} />
      </div>
    </div>
  )
}
