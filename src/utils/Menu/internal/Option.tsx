import { forwardRef } from "react";
import styled from "styled-components";
import { OptionType } from "../../../types";

const OptionStyled = styled.div<{ selected: boolean }>`
  background: ${({ selected, theme }) =>
    selected ? theme.palette.primary.main : "none"};
  &:hover {
    background: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : "#c5c5c5"};
  }
`;

type OptionProps = OptionType & {
  selected?: boolean;
  onClickOption: (data: OptionType) => void;
};

export const Option = forwardRef<HTMLDivElement, OptionProps>(
  ({ label, value, selected, onClickOption }, ref) => {
    return (
      <OptionStyled
        ref={ref}
        selected={selected ?? false}
        onClick={() => {
          onClickOption({ label, value });
        }}
      >
        {label}
      </OptionStyled>
    );
  }
);
