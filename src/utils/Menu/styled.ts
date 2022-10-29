import styled from "styled-components";

export const MenuContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing / 2}px 0`};
  border-radius: ${({ theme }) => `0 0 ${theme.radius}px ${theme.radius}px`};
  border: ${({ theme }) => `1px solid ${theme.palette.gray.main}`};
  border-top: none;
`;
