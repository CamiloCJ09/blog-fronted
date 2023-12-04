import axios from "axios";
import authHeader from "./authHeader";
import { CommentCreateType } from "../types/CommentType";

const URL_API = import.meta.env.VITE_URL_API;



const createComment = (comment: CommentCreateType) => {

  return axios.post(`${URL_API}comments`, comment, {
    headers: authHeader(),
  });
};

const deleteComment = (commentId: number) => {
  return axios.delete(`${URL_API}comments/${commentId}`, {
    headers: authHeader(),
  });
}

const updateComment = (commentId: number, comment: CommentCreateType) => {
  return axios.put(`${URL_API}comments/${commentId}`, comment, {
    headers: authHeader(),
  });
}

const getCommentFromPost = (postId: number) => {
  return axios.get(`${URL_API}comments/${postId}`, {
    headers: authHeader(),
  });
}

const commentServices = {
  updateComment,
  createComment,
  deleteComment,
  getCommentFromPost
};

export default commentServices;