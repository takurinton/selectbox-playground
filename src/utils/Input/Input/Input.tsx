import { Icon } from "ingred-ui";
import { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { OptionType } from "../../../types";
import {
  DropdownIndicator,
  IconButton,
  IconContainer,
  InputContainer,
  InputStyle,
} from "../styled";

type InputProps<T> = {
  selected: OptionType | null;
  menuIsOpen: boolean;
  onClearValue: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
} & InputHTMLAttributes<T>;

export const Input = forwardRef<HTMLDivElement, InputProps<any>>(
  ({ selected, menuIsOpen, onClearValue, ...rest }, ref) => {
    return (
      <InputContainer ref={ref} menuIsOpen={menuIsOpen}>
        <InputStyle selected={selected !== undefined} {...rest} />
        <IconContainer>
          <IconButton>
            {selected ? (
              <div onClick={onClearValue}>
                <Icon name="close_circle" size="md" color="black" />
              </div>
            ) : (
              <></>
            )}
          </IconButton>
          <DropdownIndicator menuIsOpen={menuIsOpen}>
            <IconButton>
              <Icon name="arrow_bottom" size="md" color="black" />
            </IconButton>
          </DropdownIndicator>
        </IconContainer>
      </InputContainer>
    );
  }
);
