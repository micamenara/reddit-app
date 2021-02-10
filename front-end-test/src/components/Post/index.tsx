import { AppState } from "store/types";
import { connect } from "react-redux";
import { PostType } from "services/types/Posts";
import styled from "styled-components";

declare type PostsProps = {
  post?: PostType;
};
const mapStateToProps = (state: AppState) => {
  return {
    post: state.post,
  };
};
export default connect(mapStateToProps)(function Post({ post }: PostsProps) {
  console.log(post);
  return (
    <PostContent>
      {post && post.data ? (
        <div>
          <h1>{post.data.title}</h1>
        </div>
      ) : null}
    </PostContent>
  );
});

const PostContent = styled.div`
  flex-grow: 1;
`;
