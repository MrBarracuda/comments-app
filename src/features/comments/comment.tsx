import { DeleteIcon } from "lucide-react"
import { useAppDispatch } from "@/app/hooks"
import { deleteComment } from "@/features/comments/commentsSlice"

export function Comment({
  text,
  id,
  userFullName,
}: {
  text: string
  id: number
  userFullName: string
}) {
  const dispatch = useAppDispatch()

  function deleteCommentHandler(id: number) {
    dispatch(deleteComment(id))
    console.log("deleteCommentHandler ->", id)
  }

  return (
    <div className="flex min-h-[170px] flex-col content-between justify-between rounded-lg border-2 border-amber-300 bg-yellow-200 p-4">
      <span className="break-words">{text}</span>
      <div className="align-center flex justify-between">
        <small>{userFullName}</small>
        <DeleteIcon
          className="inline h-5 w-5 text-red-500 cursor-pointer"
          onClick={() => deleteCommentHandler(id)}
        />
      </div>
    </div>
  )
}
