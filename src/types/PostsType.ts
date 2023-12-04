type PostsType = {
  _id: number;
  email: string;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;

};

type PostCreateType = {
  userId: string;
  title: string;
  content: string;
};

export type { PostsType, PostCreateType };