import { PostType } from "services/types/Posts";

export type StoreActions = {
  post: PostType
  type: "UPDATE_POST";
};

export type AppState = {
  post: PostType
}