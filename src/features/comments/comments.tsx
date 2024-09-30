import { Comment } from "@/features/comments/comment"
import { type Comment as CommentType } from "@/features/comments/comments-slice"

type Props = {
  comments: CommentType[]
  isError: boolean
  isLoading: boolean
}

export function Comments({ comments, isError, isLoading }: Props) {

  if (isError) {
    return <h1 className="text-red-500">There was an error!!!</h1>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:p-0 p-2">
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
