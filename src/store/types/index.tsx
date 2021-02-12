import { PostType } from "services/types/Posts";

export type UpdatePostsActions = {
  posts: PostType[];
  type: "UPDATE_POSTS";
};

export type UpdateSelectedPostActions = {
  selectedPost: string;
  type: "UPDATE_SELECTED_POST";
};

export type AppState = {
  app?: {
    posts?: PostType[];
    selectedPost?: PostType;
  };
};
