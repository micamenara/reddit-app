import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

declare type PaginationProps = {
  totalItems: number;
  amountPerPage: number;
  activePage: number;
  onChange: (active: number) => void;
};

export default function Pagination({
  totalItems,
  amountPerPage,
  activePage,
  onChange,
}: PaginationProps) {
  const [pages, setPages] = useState<{ label: number; key: number }[]>([]);

  useEffect(() => {
    const newPages = [];
    for (let i = 1; i <= Math.ceil(totalItems / amountPerPage); i++) {
      newPages.push({
        label: i,
        key: i - 1,
      });
    }
    setPages(newPages);
  }, [totalItems, amountPerPage]);

  return (
    <StyledPagination>
      {pages.map((page) => (
        <li key={page.key}>
          <PageButton
            onClick={() => {
              onChange(page.key);
            }}
            isActive={page.key === activePage}
          >
            {page.label}
          </PageButton>
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

const PageButton = styled.button<{ isActive: boolean }>`
  cursor: pointer;
  background: transparent;
  border: none;
  color: white;
  width: ${({ theme }) => theme.sizes.lg};
  height: ${({ theme }) => theme.sizes.lg};
  outline: none;
  margin-right: ${({ theme }) => theme.sizes.sm};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      background-color: ${theme.colors.primary};
      border-radius: 50%;
    `}
`;
