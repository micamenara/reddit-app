import { PostType } from "services/types/Posts";
import Author from "components/Author";
import Comments from "components/Comments";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useState } from "react";
import fadeOut from "styles/Animations/fade-out";

export default function PostCard({
  post,
  onClick,
  onDelete,
  className,
}: {
  className?: string;
  post: PostType;
  onClick: () => void;
  onDelete: () => void;
}) {
  const date = moment.unix(post.data.created).fromNow();
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <PostBox
      className={className || ""}
      onClick={() => {
        onClick();
      }}
      isDeleted={isDeleted}
      isUnread={post.data.status === "unreaded"}
    >
      <PostBoxData>
        <Author author={post.data.author} thumbnail={post.data.thumbnail} url={post.data.url} />
        <StyledButton
          onClick={(evt) => {
            evt.stopPropagation();
            setIsDeleted(true);
            setTimeout(() => {
              onDelete();
              setIsDeleted(false);
            }, 300);
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="sm" />
        </StyledButton>
      </PostBoxData>
      <h4>{post.data.title}</h4>
      <CommentsAndTime>
        <Comments amount={post.data.num_comments} />
        <Date>{date}</Date>
      </CommentsAndTime>
    </PostBox>
  );
}

const PostBox = styled.div<{ isUnread: boolean; isDeleted: boolean }>`
  padding: ${({ theme }) => theme.sizes.sm};
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.lighterDark};
  border-radius: 4px;
  border-left: 2px solid transparent;
  transition: border-left 300ms ease-out;
  cursor: pointer;

  > h4 {
    margin: ${({ theme }) => theme.sizes.md} 0px;
  }

  ${({ isUnread }) =>
    isUnread &&
    css`
      border-left: 2px solid ${({ theme }) => theme.colors.accent};
    `}

  ${({ isDeleted }) =>
    isDeleted &&
    css`
      animation: ${fadeOut} 1s ease-out both;
    `}
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

const CommentsAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.gray1};
  font-size: ${({ theme }) => theme.sizes.sm};
`;
