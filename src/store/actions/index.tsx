import { PostType } from "services/types/Posts";

export const updatePosts = (posts: PostType[]) => {
  return {
    type: "UPDATE_POSTS",
    posts,
  };
};

export const updateSelectedPost = (post: PostType) => {
  return {
    type: "UPDATE_SELECTED_POST",
    selectedPost: post,
  };
};
