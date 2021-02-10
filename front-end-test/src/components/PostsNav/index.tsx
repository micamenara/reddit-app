import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCommentAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { PostType } from "services/types/Posts";
import styled from "styled-components";
import Button from "components/Button";

declare type PostsNavProps = {
  posts?: PostType[];
};

export default function PostsNav({ posts }: PostsNavProps) {
  return (
    <PostNavContainer>
      <Trending>
        <FontAwesomeIcon icon={faChartLine} size="lg" /> TRENDING ON REDDIT
      </Trending>
      <NavContent>
        {posts && posts.length ? (
          posts.map((post, index) => (
            <PostBox key={index}>
              <PostBoxData>
                <Author>
                  <img src={post.data.thumbnail} alt={post.data.author} />
                  <span>{post.data.author}</span>
                </Author>
                <StyledButton>
                  <FontAwesomeIcon icon={faTimes} size="sm" />
                </StyledButton>
              </PostBoxData>
              <h4>{post.data.title}</h4>
              <Comments>
                <FontAwesomeIcon icon={faCommentAlt} size="sm" />{" "}
                {post.data.num_comments}
              </Comments>
            </PostBox>
          ))
        ) : (
          <span>Loading...</span>
        )}
      </NavContent>
      <FullButton variant="primary">Dismiss all</FullButton>
    </PostNavContainer>
  );
}

const PostBox = styled.div`
  padding: ${({ theme }) => theme.sizes.sm};
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.lighterDark};
  border-radius: 4px;
  > h4 {
    margin: ${({ theme }) => theme.sizes.md} 0px;
  }
`;

const PostNavContainer = styled.div`
  width: 300px;
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

const Comments = styled.span`
  color: ${({ theme }) => theme.colors.primaryLight};
  font-size: 14px;
`;

const Author = styled.div`
  display: flex;

  align-items: center;
  > span {
    color: #a19fb3;
    font-size: ${({ theme }) => theme.sizes.sm};
  }
  > img {
    margin-right: ${({ theme }) => theme.sizes.sm};
    width: ${({ theme }) => theme.sizes.lg};
    height: ${({ theme }) => theme.sizes.lg};
    object-fit: cover;
    border-radius: 50%;
  }
`;

const FullButton = styled(Button)`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;
