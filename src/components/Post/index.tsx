import { AppState } from "store/types";
import { connect } from "react-redux";
import { PostType } from "services/types/Posts";
import styled from "styled-components";
import Author from "components/Author";
import Comments from "components/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

declare type PostsProps = {
  post?: PostType;
};

const mapStateToProps = (state: AppState) => {
  return {
    post: state?.app?.selectedPost,
  };
};

export default connect(mapStateToProps)(function Post({ post }: PostsProps) {
  return (
    <PostContent>
      {post && post.data ? (
        <>
          <Author
            author={post.data.author}
            thumbnail={post.data.thumbnail}
            url={post.data.url}
            size="big"
          />
          <h2>{post.data.title}</h2>

          <CommentsAndTime>
            <Comments amount={post.data.num_comments} />
            <Date>{moment.unix(post.data.created).fromNow()}</Date>
          </CommentsAndTime>
        </>
      ) : (
        <LoaderContainer>
          <FontAwesomeIcon icon={faSpinner} pulse size="5x" />
        </LoaderContainer>
      )}
    </PostContent>
  );
});

const PostContent = styled.div`
  flex-grow: 1;
  padding: ${({ theme }) => theme.sizes.md};
  margin-top: ${({ theme }) => theme.sizes.homeTitle};
`;

const CommentsAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.gray1};
  font-size: ${({ theme }) => theme.sizes.sm};
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
