import React from "react"
import postServices from "../../services/postService"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
} from "@nextui-org/react"

interface postFormProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isEdit?: boolean
  postId?: number
  postTittle?: string
  postContent?: string
}

const PostForm = ({
  isOpen,
  setIsOpen,
  isEdit,
  postId,
  postTittle,
  postContent,
}: postFormProps) => {
  const { onOpenChange } = useDisclosure()
  const [title, setTittle] = React.useState(postTittle || "")
  const [content, setContent] = React.useState(postContent || "")

  const handleTittleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTittle(e.target.value)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const handleSubmission = () => {
    if (isEdit && postId && title && content) {
      const data = {
        userId: String.raw`${localStorage.getItem("userId") || ""}`,
        title: title,
        content: content,
      }
      postServices.updatePost(postId, data).then((res) => {
        if (res.status !== 200) {
          alert("Error")
        }
        window.location.reload()
      })
      setIsOpen(false)
      return
    }
    const data = {
      userId: String.raw`${localStorage.getItem("userId") || ""}`,
      title: title,
      content: content,
    }
    postServices.createPost(data)
    setIsOpen(false)
    window.location.reload()

  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Create Post</ModalHeader>
        <ModalBody>
          <Input
            autoFocus
            onChange={(e) => handleTittleChange(e)}
            label="Title"
            defaultValue={title}
            placeholder="Enter your title"
            variant="bordered"
            name="title"
          />
          <Textarea
            isRequired={true}
            label="Content"
            defaultValue={content}
            onChange={(e) => handleContentChange(e)}
            placeholder="Enter your post content"
            name="content"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={handleClose}>
            Close
          </Button>
          <Button
            color="success"
            variant="flat"
            isDisabled={title === "" || content === ""}
            onPress={handleSubmission}
            name="submit"
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PostForm
