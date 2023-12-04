import CommentForm from "./commentForm"
import { useState } from "react"
import commentServices from "../../services/commentService"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react"

interface PostLayoutModalProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  postId: number
  commentId?: number
  commentContent?: string
  isEdit?: boolean
}

const PostLayoutModal = ({
  isOpen,
  postId,
  setIsOpen,
  isEdit,
  commentId,
  commentContent,
}: PostLayoutModalProps) => {
  const [comment, setComment] = useState(commentContent || "")
  const { onClose } = useDisclosure()

  const handleClose = () => {
    setComment("")
    setIsOpen(false)
    onClose()
  }

  const handleComment = () => {
    if (isEdit && commentId && comment) {
      const data = {
        userId: String.raw`${localStorage.getItem("userId") || ""}`,
        postId: String.raw`${postId}`,
        content: comment,
      }
      commentServices.updateComment(commentId, data).then((res) => {
        if (res.status !== 200) {
          alert("Error")
        }
        
      })
      setIsOpen(false)
      return
    }
    const data = {
      userId: String.raw`${localStorage.getItem("userId") || ""}`,
      postId: String.raw`${postId}`,
      content: comment,
    }
    commentServices.createComment(data)

    setComment("")
    setIsOpen(false)
    onClose()
  }
  return (
    <div className="flex flex-col items-center max-h-[800px] w-56 ">
      <Modal isOpen={isOpen} onClose={handleClose} className="">
        <ModalContent className="items-center">
          <div className="align-middle">
            <ModalHeader className="ml-4">Add your comment!</ModalHeader>
          </div>
          <ModalBody className="w-full">
            <CommentForm prop={setComment} commentContent={comment}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              isDisabled={comment === ""}
              onClick={handleComment}
            >
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
export default PostLayoutModal
