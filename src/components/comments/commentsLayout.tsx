import commentServices from "../../services/commentService"
import { useEffect, useState } from "react"
import CommentsModal from "./commentsModal"
import {
  useDisclosure,
} from "@nextui-org/react"

interface CommentData {
  _id: number
  userId: string
  postId: string
  content: string
  createdAt: string
}
interface CommentLayoutProps {
  isModalOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  post_id: number
}

const CommentLayout = ({
  isModalOpen,
  setIsOpen,
  post_id,
}: CommentLayoutProps) => {
  const { onClose } = useDisclosure()
  const [comments, setComments] = useState<CommentData[]>([])
  useEffect(() => {
    commentServices.getCommentFromPost(post_id).then((res) => {
      setComments(res.data)
    })
  })

  
  const handleOnClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <div className="flex flex-col items-center max-h-[800px] ">
      {isModalOpen &&  (
        <CommentsModal comments={comments} onClose={handleOnClose} />
      )}
    </div>
  )
}

export default CommentLayout
