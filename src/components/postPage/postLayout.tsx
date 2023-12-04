import { PostsType } from "../../types/PostsType"
import { useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import { Divider } from "@nextui-org/react"
import CommentLayout from "../comments/commentsLayout"
import PostLayoutModal from "./postLayoutModal"
import PostForm from "./postForm"
import postServices from "../../services/postService"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react"

interface PostsProps {
  posts: PostsType[]
  setNewPost: React.Dispatch<React.SetStateAction<boolean>>
}

const PostLayout = ({ posts, setNewPost }: PostsProps) => {
  const [postId, setPostId] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [createPost, setCreatePost] = useState(false)
  const [addedPost, setAddedPost] = useState(false)

  const [editPost, setEditPost] = useState(false)
  const [postTitleToEdit, setPostTitleToEdit] = useState("")
  const [postContentToEdit, setPostContentToEdit] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("userId")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    window.location.reload()
  }

  const handleAddComment = (actualPostId: number) => {
    setPostId(actualPostId)
    setShowModal(true)
  }

  const handleShowComments = (actualPostId: number) => {
    setPostId(actualPostId)
    setShowComments(true)
  }

  const handleCreatePost = () => {
    setAddedPost(!addedPost)

    setNewPost(addedPost)
    setCreatePost(true)
  }

  const handleDeletePost = (postId: number) => {
    postServices.deletePost(postId)
    window.location.reload()
  }

  const handlePostToEdit = (
    postId: number,
    postTitle: string,
    postContent: string
  ) => {
    setPostId(postId)
    setPostTitleToEdit(postTitle)
    setPostContentToEdit(postContent)
    setEditPost(true)
  }

  return (
    <div className="flex flex-col items-center h-full w-full ">
      <div className="flex flex-col justify-center items-center">
        <h1 className=" m-3 font-bold">Post Layout</h1>
        <div className="flex flex-row space-x-2">
          <Button color="primary" onClick={handleCreatePost}>
            Create Post
          </Button>
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {createPost && (
          <PostForm setIsOpen={setCreatePost} isOpen={createPost} />
        )}
      </div>

      <div className="flex flex-wrap items-start wr justify-center  h-ful max-w-[800px] ">
        {posts.map((post: PostsType) => (
          <div
            key={post._id}
            className="p-4 w-[400px] h-300px max-w-[400PX] max-h-[500px]"
          >
            <Card className="max-h-[400px]  h-300px" key={post._id}>
              <CardHeader className=" flex-col justify-center ">
                <div className="flex flex-row justify-center items-center font-bold mb-3">
                  <p className="  ">{post.title}</p>
                  <div>
                    {localStorage.getItem("userId") === post.userId && (
                      <div>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        {editPost && (
                          <PostForm
                            setIsOpen={setEditPost}
                            isOpen={editPost}
                            isEdit={true}
                            postId={postId}
                            postTittle={postTitleToEdit}
                            postContent={postContentToEdit}
                          />
                        )}
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            handlePostToEdit(post._id, post.title, post.content)
                          }
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                </div>

                <Divider />
              </CardHeader>
              <CardBody className="max-h-[200px] ">
                <p className="leading-relaxed text-base text-black font-sans dark:text-gray-30 text-justify">
                  {post.content}
                </p>
              </CardBody>
              <CardFooter className="text-small justify-between space-x-2">
                <div className="p-4 max-w-sm">
                  <Button
                    color="primary"
                    onPress={() => handleAddComment(post._id)}
                  >
                    Add comment
                  </Button>
                </div>
                <div className="p-4 max-w-sm">
                  <Button
                    color="primary"
                    onPress={() => handleShowComments(post._id)}
                  >
                    Show comments
                  </Button>
                  {showComments && (
                    <CommentLayout
                      isModalOpen={showComments}
                      setIsOpen={setShowComments}
                      post_id={postId}
                    />
                  )}
                </div>
                <PostLayoutModal
                  postId={postId}
                  setIsOpen={setShowModal}
                  isOpen={showModal}
                />
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostLayout
