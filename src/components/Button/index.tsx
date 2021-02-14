import { ReactChild } from "react";
import styled, { css } from "styled-components";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactChild;
  disabled?: boolean;
  href?: string;
}

declare type ButtonType = ButtonProps &
  Omit<JSX.IntrinsicElements["button"], "ref">;

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonType): JSX.Element {
  return (
    <StyledButton {...props} variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonType>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  padding: ${({ theme }) => `${theme.sizes.sm} ${theme.sizes.md}`};
  border-radius: ${({ theme }) => theme.sizes.sm};
  outline: 0px;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;

  /* Disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: auto;
    `}

  /* Primary */
  ${({ theme, variant }) =>
    variant === "primary" &&
    css`
      color: white;
      background-color: ${theme.colors.primary};
      &:active {
        background-color: ${theme.colors.primaryLight};
      }
      &:hover,
      &:focus {
        box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
          0px 8px 10px 1px rgba(0, 0, 0, 0.14),
          0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      }
    `}
`;
