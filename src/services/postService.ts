import axios from "axios";
import authHeader from "./authHeader";
import { PostCreateType } from "../types/PostsType";

const URL_API = import.meta.env.VITE_URL_API;

const createPost = (post: PostCreateType) => {
  return axios.post(`${URL_API}posts`, post, {
    headers: authHeader(),
  });
};

const deletePost = (postId: number) => {
  return axios.delete(`${URL_API}posts/${postId}`, {
    headers: authHeader(),
  });
}

const updatePost = (postId: number, post: PostCreateType) => {
  return axios.put(`${URL_API}posts/${postId}`, post, {
    headers: authHeader(),
  });
}

const getPosts = () => {
  return axios.get(`${URL_API}posts`, {
    headers: authHeader(),
  });
};

const postServices = {
  updatePost,
  deletePost,
  createPost,
  getPosts,
};

export default postServices;