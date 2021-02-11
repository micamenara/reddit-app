import { PostType } from "services/types/Posts";
import Author from "components/Author";
import Comments from "components/Comments";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function PostCard({
  post,
  onClick,
  onDelete,
}: {
  post: PostType;
  onClick: () => void;
  onDelete: () => void;
}) {
  return (
    <PostBox
      onClick={() => {
        onClick();
      }}
    >
      <PostBoxData>
        <Author author={post.data.author} thumbnail={post.data.thumbnail} />
        <StyledButton onClick={() => onDelete()}>
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </StyledButton>
      </PostBoxData>
      <h4>{post.data.title}</h4>
      <Comments amount={post.data.num_comments} />
    </PostBox>
  );
}
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
  outline: none;
`;

const PostBoxData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
