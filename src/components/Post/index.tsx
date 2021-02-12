import { AppState } from "store/types";
import { connect } from "react-redux";
import { PostType } from "services/types/Posts";
import styled from "styled-components";
import Author from "components/Author";
import Comments from "components/Comments";

declare type PostsProps = {
  post?: PostType;
};
const mapStateToProps = (state: AppState) => {
  return {
    post: state?.app?.selectedPost,
  };
};
export default connect(mapStateToProps)(function Post({ post }: PostsProps) { 
  return post && post.data ? (
    <PostContent>
      <Author
        author={post.data.author}
        thumbnail={post.data.thumbnail}
        size="big"
      />
      <h2>{post.data.title}</h2>
      <Comments amount={post.data.num_comments} />
    </PostContent>
  ) : null;
});

const PostContent = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => theme.sizes.md};
  margin-top:${({ theme }) => theme.sizes.homeTitle};
`;
