import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { Post } from "services/types/Posts";
import styled from "styled-components";

declare type PostsNavProps = {
  posts?: Post[];
};

export default function PostsNav({ posts }: PostsNavProps) {
  return (
    <PostNavContainer>
      <Trending>
        <FontAwesomeIcon icon={faChartLine} size="lg" /> TRENDING ON JAVASCRIPT
      </Trending>
      <NavContent>
        {posts && posts.length ? (
          posts.map((post, index) => (
            <PostBox key={index}>
              <span>{post.data.author}</span>
              <h4>{post.data.title}</h4>
            </PostBox>
          ))
        ) : (
          <span>Loading...</span>
        )}
      </NavContent>
    </PostNavContainer>
  );
}

const PostBox = styled.div`
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.lighterDark};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  > span {
    color: #a19fb3;
    font-size: 12px;
  }
  > h4 {
    margin: 12px 0px;
  }
`;

const PostNavContainer = styled.div`
  width: 300px;
  position: sticky;
  max-height: calc(100vh - 144px);
`;

const Trending = styled.h6`
  margin: 0px;
  padding: 24px 12px;
  width: 100%;
`;

const NavContent = styled.div`
  overflow: auto;
  max-height: calc(100vh - 206px);
`;
