import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import isValidUrl from "utils/isValidUrl";

export default function Author({
  thumbnail,
  author,
  url,
  size = "small",
}: {
  thumbnail: string;
  author: string;
  url: string;
  size?: "big" | "small";
}) {
  return (
    <StyledAuthor size={size}>
      {isValidUrl(thumbnail) ? (
        <a href={url} target="_blank" rel="noreferrer">
          <img src={thumbnail} alt={author} />
        </a>
      ) : (
        <User size={size}>
          <FontAwesomeIcon
            icon={faUser}
            size={size === "small" ? "sm" : "2x"}
          />
        </User>
      )}
      <span>{author}</span>
    </StyledAuthor>
  );
}

const StyledAuthor = styled.div<{ size: "big" | "small" }>`
  display: flex;
  align-items: center;

  > span {
    color: ${({ theme }) => theme.colors.gray1};
    font-size: ${({ theme }) => theme.sizes.sm};
  }
  > a > img {
    margin-right: ${({ theme }) => theme.sizes.sm};
    width: ${({ theme }) => theme.sizes.lg};
    height: ${({ theme }) => theme.sizes.lg};
    object-fit: cover;
    border-radius: 50%;
  }
  ${({ size }) =>
    size === "big" &&
    css`
      > a > img {
        width: ${({ theme }) => theme.sizes.xl};
        height: ${({ theme }) => theme.sizes.xl};
      }
      > span {
        font-size: ${({ theme }) => theme.sizes.md};
      }
    `}
`;

const User = styled.div<{ size: "big" | "small" }>`
  width: ${({ theme }) => theme.sizes.lg};
  height: ${({ theme }) => theme.sizes.lg};
  background-color: ${({ theme }) => theme.colors.gray1};
  color: ${({ theme }) => theme.colors.dark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ theme }) => theme.sizes.sm};

  ${({ size }) =>
    size === "big" &&
    css`
      width: ${({ theme }) => theme.sizes.xl};
      height: ${({ theme }) => theme.sizes.xl};
    `}
`;
