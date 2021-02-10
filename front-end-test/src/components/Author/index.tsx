import styled, { css } from "styled-components";

export default function Author({
  thumbnail,
  author,
  size = "small",
}: {
  thumbnail: string;
  author: string;
  size?: "big" | "small";
}) {
  return (
    <StyledAuthor size={size}>
      <img src={thumbnail} alt={author} />
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
  > img {
    margin-right: ${({ theme }) => theme.sizes.sm};
    width: ${({ theme }) => theme.sizes.lg};
    height: ${({ theme }) => theme.sizes.lg};
    object-fit: cover;
    border-radius: 50%;
  }
  ${({ size }) =>
    size === "big" &&
    css`
      > img {
        width: ${({ theme }) => theme.sizes.xl};
        height: ${({ theme }) => theme.sizes.xl};
      }
      > span {
        font-size: ${({ theme }) => theme.sizes.md};
      }
    `}
`;
