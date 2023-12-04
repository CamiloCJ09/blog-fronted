import IconButton from "@mui/material/IconButton"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import DeleteIcon from "@mui/icons-material/Delete"
import commentServices from "../../services/commentService"
import { useState } from "react"
import PostLayoutModal from "../postPage/postLayoutModal"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react"

interface CommentData {
  _id: number
  userId: string
  postId: string
  content: string
  createdAt: string
}

interface CommentModalProps {
  comments: CommentData[]
  onClose: () => void
  
}

const CommentsModal = ({ comments, onClose }: CommentModalProps) => {
  
  const [isEdit, setIsEdit] = useState(false)
  const [commentId, setCommentId] = useState(0)
  const [commentContent, setCommentContent] = useState("")


  const handleDeleteComment = (commentId: number) => {
    commentServices.deleteComment(commentId)
    onClose()
  }

  const handleEditComment = (commentId: number, commentContent: string) => {

    setCommentId(commentId)
    setCommentContent(commentContent)

    setIsEdit(true)
  }

  return (
    <div className="flex flex-col items-center max-h-[800px] w-56 ">
      <Modal
        isOpen={true}
        onClose={onClose}
        scrollBehavior={"inside"}
        className="max-h-[500px] w-[600px] gap"
      >
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalBody>
            <div className="flex flex-col">
              {comments.map((comment) => (
                <Card key={comment._id} className=" mt-3">
                  <CardHeader className="font-bold">
                    {comment.userId}
                    {localStorage.getItem("userId") === comment.userId && (
                      <div>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditComment(comment._id, comment.content)}
                        >
                          <ModeEditIcon />
                        </IconButton>

                        {isEdit && (
                          <PostLayoutModal
                            setIsOpen={setIsEdit}
                            isOpen={isEdit}
                            postId={comment.postId}
                            commentId={commentId}
                            commentContent={commentContent}
                            isEdit={isEdit}
                          />
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardBody>{comment.content}</CardBody>
                  <CardFooter className="text-xs">
                    {comment.createdAt}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CommentsModal
