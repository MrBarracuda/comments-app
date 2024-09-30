import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAppDispatch } from "@/app/hooks"
import { createComment } from "@/features/comments/comments-slice"
import { Input } from "@/components/ui/input"

export function CreateCommentModal() {
  const [body, setBody] = useState("")
  const [fullName, setFullName] = useState("")
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (body.trim() === "" || fullName.trim() === "") return

    const newComment = {
      id: Date.now(),
      body,
      user: {
        id: Date.now(),
        username: "sampleUser",
        fullName,
      },
    }

    dispatch(createComment(newComment))
    setBody("")
    setFullName("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create a Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Comment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="full-name">Full Name</Label>
            <Input
              id="full-name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Enter your full name..."
              className="col-span-1"
              required
            />
            <Textarea
              id="comment"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Write your comment here..."
              className="col-span-1"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Comment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
