import {
  UpdatePostsActions,
  UpdateSelectedPostActions,
  AppState,
} from "store/types";

const postReducer = (
  state: AppState = {},
  action: UpdatePostsActions | UpdateSelectedPostActions
) => {
  switch (action.type) {
    case "UPDATE_POSTS":
      return {
        ...state,
        posts: action.posts,
      };
    case "UPDATE_SELECTED_POST":
      return {
        ...state,
        selectedPost: action.selectedPost,
      };

    default:
      return state;
  }
};

export default postReducer;
