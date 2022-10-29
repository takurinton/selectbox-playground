import { Flex } from "ingred-ui";
import styled from "styled-components";

export const MultiSelectedStyle = styled.div`
  padding: 0px ${({ theme }) => theme.spacing / 2}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-radius: 8px;
  margin: 0px ${({ theme }) => theme.spacing / 2}px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.gray.dark};
`;

export const MultiRemoveIcon = styled.div`
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding: 0px ${({ theme }) => theme.spacing};
`;

export const MultiSelectContainer = styled(Flex)`
  padding: ${({ theme }) => `${theme.spacing}px 0`};
`;
