import styled from "styled-components";

export const InputContainer = styled.div<{ menuIsOpen: boolean }>`
  padding: ${({ theme }) => theme.spacing / 4}px;
  background: 0;
  display: flex;
  border-radius: ${({ theme, menuIsOpen }) =>
    menuIsOpen
      ? `${theme.radius}px  ${theme.radius}px 0 0`
      : `${theme.radius}px`};
  border: ${({ theme }) => `1px solid ${theme.palette.gray.main}`};
  border-bottom: ${({ theme, menuIsOpen }) =>
    menuIsOpen ? "none" : `1px solid ${theme.palette.gray.main}`};
  min-height: 38px;
`;

export const InputStyle = styled.input<{ selected: boolean }>`
  cursor: default;
  color: inherit;
  border: 0;
  opacity: 1;
  width: 100%;
  gridarea: 1/2;
  font: inherit;
  min-width: 2px;
  margin: 0;
  outline: 0;
  padding: ${({ theme }) => `${theme.spacing / 4}px ${theme.spacing}px`};

  &::placeholder {
    color: ${({ selected, theme }) =>
      selected ? theme.palette.black : theme.palette.gray.main};
  }
`;

export const IconContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

export const IconButton = styled.div`
  padding: ${({ theme }) => theme.spacing * 1.25}px;
`;

export const DropdownIndicator = styled.div<{ menuIsOpen: boolean }>`
  transition: transform 150ms;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? "rotate(180deg)" : "")};
`;
