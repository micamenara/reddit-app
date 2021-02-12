import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function Comments({ amount }: { amount: number }) {
  return (
    <StyledComments>
      <FontAwesomeIcon icon={faCommentAlt} size="sm" /> {amount}
    </StyledComments>
  );
}

const StyledComments = styled.span`
  color: ${({ theme }) => theme.colors.primaryLight};
  font-size: 14px;
`;
