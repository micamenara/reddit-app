import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { updateSelectedPost } from "store/actions";
import {
  faChartLine,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { PostType } from "services/types/Posts";
import styled from "styled-components";
import Button from "components/Button";
import Author from "components/Author";
import Comments from "components/Comments";

declare type PostsNavProps = {
  posts?: PostType[];
  handleUpdateSelecetdPost: (post: PostType) => void;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleUpdateSelecetdPost: (post: PostType) => {
      dispatch(updateSelectedPost(post));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(function PostsNav({ posts, handleUpdateSelecetdPost }: PostsNavProps) {
  return (
    <PostNavContainer>
      <Trending>
        <FontAwesomeIcon icon={faChartLine} size="lg" /> TRENDING ON REDDIT
      </Trending>
      <NavContent>
        {posts && posts.length ? (
          posts.map((post, index) => (
            <PostBox
              key={index}
              onClick={() => {
                handleUpdateSelecetdPost(post);
              }}
            >
              <PostBoxData>
                <Author author={post.data.author} thumbnail={post.data.thumbnail} />
                <StyledButton>
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </StyledButton>
              </PostBoxData>
              <h4>{post.data.title}</h4>
              <Comments amount={post.data.num_comments} />
            </PostBox>
          ))
        ) : (
          <span>Loading...</span>
        )}
      </NavContent>
      <FullButton variant="primary">Dismiss all</FullButton>
    </PostNavContainer>
  );
});

const PostBox = styled.div`
  padding: ${({ theme }) => theme.sizes.sm};
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.lighterDark};
  border-radius: 4px;
  cursor: pointer;
  > h4 {
    margin: ${({ theme }) => theme.sizes.md} 0px;
  }
`;

const PostNavContainer = styled.div`
  width: 300px;
  min-width: 300px;
  position: relative;
  max-height: ${({ theme }) => `calc(100vh - ${theme.sizes.homeTitle})`};
`;

const Trending = styled.h6`
  margin: 0px;
  padding: ${({ theme }) => `${theme.sizes.lg} ${theme.sizes.sm}`};
  width: 100%;
  height: ${({ theme }) => theme.sizes.trending};
`;

const NavContent = styled.div`
  overflow: auto;
  height: ${({ theme }) =>
    `calc(100vh - ${theme.sizes.homeTitle} - ${theme.sizes.trending} - ${theme.sizes.sm} - ${theme.sizes.sm})`};
  padding-bottom: 40px;
`;

const StyledButton = styled.button`
  background: #ffffff45;
  border: none;
  padding: 8px;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme }) => theme.sizes.lg};
  height: ${({ theme }) => theme.sizes.lg};
  cursor: pointer;
`;

const PostBoxData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const FullButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;
