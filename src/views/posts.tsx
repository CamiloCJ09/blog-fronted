import { useState, useEffect } from "react"
import PostLayout from "../components/postPage/postLayout"
import postServices from "../services/postService"
import { PostsType } from "../types/PostsType"

const Posts = () => {
  
  const [posts, setPosts] = useState<PostsType[]>([])
  const [newPost, setNewPost] = useState(false)

  useEffect(() => {
    postServices.getPosts().then((res) => {
      setPosts(res.data)
    })
  }, [newPost])
  

  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <PostLayout posts={posts} setNewPost={setNewPost} />
    </div>
  )
}

export default Posts
