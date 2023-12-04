import React from "react"
import { Textarea } from "@nextui-org/react"
import { useState } from "react"

interface CommentFormProps {
  prop: React.Dispatch<React.SetStateAction<string>>
  commentContent?: string
}
const CommentForm = ({ prop, commentContent }: CommentFormProps) => {

  const [comment, setComment] = useState(commentContent)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    prop(e.target.value)
    setComment(e.target.value)
  }


  return (
    <div className="p-4 max-w-[500px] w-full">
      <form>
        <Textarea
          isRequired={true}
          label="Comment"
          defaultValue={comment}
          onChange={(e) => handleTextChange(e)}
          placeholder="Enter your comment"
        />
      </form>
    </div>
  )
}

export default CommentForm
