import { PostType } from "services/types/Posts"

export const updatePost = (post: PostType) => {
  return {
    type: 'UPDATE_POST',
    post,
  }
}