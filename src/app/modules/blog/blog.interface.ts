export type TBlog = {
  id: string;
  authorname: string;
  blogtitle: string;
  publicationdate: string;
  category: string;
  content: string;
  thumbnail: string;
  Comment?: Comment[];
  Reply?: Reply[];
};

export type Reply = {
  id: string;
  blogId: string;
  blog: TBlog;
  commentId: string;
  comment: Comment;
  name: string;
  email: string;
  content: string;
};

export type TComment = {
  id: string;
  blogId: string;
  blog: TBlog;
  name: string;
  email: string;
  content: string;

  Reply: Reply[];
};
