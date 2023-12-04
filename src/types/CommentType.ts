type CommentType = {
  _id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type CommentCreateType = {
  content: string;
  userId: string;
  postId: string;
};

export type { CommentType, CommentCreateType };