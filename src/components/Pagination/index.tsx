import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

declare type PaginationProps = {
  totalItems: number;
  amountPerPage: number;
  onChange: (active: number) => void;
};

export default function Pagination({
  totalItems,
  amountPerPage,
  onChange,
}: PaginationProps) {
  const [active, setActive] = useState(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const newPages = [];
    for (let i = 1; i <= Math.ceil(totalItems / amountPerPage); i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [totalItems, amountPerPage]);

  return (
    <StyledPagination>
      {pages.map((page) => (
        <li key={page}>
          <Page
            onClick={() => {
              setActive(page);
              onChange(page - 1);
            }}
            isActive={active === page}
          >
            {page}
          </Page>
        </li>
      ))}
    </StyledPagination>
  );
}

const StyledPagination = styled.ul`
  list-style: none;
  display: flex;
  padding: 0px;
`;

const Page = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  background: transparent;
  border: none;
  color: white;
  width: ${({ theme }) => theme.sizes.lg};
  height: ${({ theme }) => theme.sizes.lg};
  outline: none;
  margin-right: ${({ theme }) => theme.sizes.sm};

  ${({ isActive, theme }) =>
    isActive &&
    css`
    background-color: ${theme.colors.primary};
    border-radius: 50%;
  `}
`;
