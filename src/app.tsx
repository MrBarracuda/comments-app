import { Comments } from "./features/comments/comments"

export default function App() {
  return (
    <div className="container mx-auto py-14">
      <div className="flex flex-col gap-4 space-y-3 relative">
        <h1 className="text-3xl font-bold text-center">Comments</h1>
        <Comments />
      </div>
    </div>
  )
}
