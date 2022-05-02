import { Flex, Icon } from "ingred-ui";
import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useCallback,
} from "react";
import styled from "styled-components";
import { OptionType } from "./types";

const InputContainer = styled.div<{ menuIsOpen: boolean }>`
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

const IconContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

const IconButton = styled.div`
  padding: ${({ theme }) => theme.spacing * 1.25}px;
`;

const DropdownIndicator = styled.div<{ menuIsOpen: boolean }>`
  transition: transform 150ms;
  transform: ${({ menuIsOpen }) => (menuIsOpen ? "rotate(180deg)" : "")};
`;

const MultiSelectedStyle = styled.div`
  padding: 0px ${({ theme }) => theme.spacing / 2}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  border-radius: 8px;
  margin: 0px ${({ theme }) => theme.spacing / 2}px;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.gray.dark};
`;

const MultiRemoveIcon = styled.div`
  align-items: center;
  display: flex;
  box-sizing: border-box;
  padding: 0px ${({ theme }) => theme.spacing};
`;

const MultiSelectContainer = styled(Flex)`
  padding: ${({ theme }) => `${theme.spacing}px 0`};
`;

type MultiSelectedProps = {
  onRemoveValue: (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    value: string | number
  ) => void;
  selected: any;
};

const MultiSelected = forwardRef<HTMLDivElement, MultiSelectedProps>(
  ({ onRemoveValue, selected }, ref) => {
    return (
      <MultiSelectContainer ref={ref} display="flex">
        {selected?.map((s: OptionType, index: number) => (
          <MultiSelectedStyle key={index}>
            {s.label}
            <MultiRemoveIcon
              onClick={(
                event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
              ) => {
                onRemoveValue(event, s.value);
              }}
            >
              <Icon name="close_circle" color="black" />
            </MultiRemoveIcon>
          </MultiSelectedStyle>
        ))}
      </MultiSelectContainer>
    );
  }
);

type InputProps<T> = {
  selected: OptionType[] | undefined;
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

type MultipleInputProps<T> = {
  selected: OptionType[] | undefined;
  menuIsOpen: boolean;
  handleRemoveValue: (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    value: string | number
  ) => void;
  onPopValue: () => void;
  onClearValue: (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void;
} & InputHTMLAttributes<T>;

export const MultipleInput = forwardRef<
  HTMLDivElement,
  MultipleInputProps<any>
>(
  (
    {
      selected,
      menuIsOpen,
      handleRemoveValue,
      onPopValue,
      onClearValue,
      ...rest
    },
    ref
  ) => {
    const onRemoveValue = useCallback(
      (
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
        value: string | number
      ) => {
        handleRemoveValue(event, value);
      },
      [selected]
    );

    const onKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (
          rest.value === "" &&
          selected !== undefined &&
          selected.length !== 0
        ) {
          if (event.key === "Backspace") {
            onPopValue();
          }
        }
      },
      [selected, rest.value]
    );

    return (
      <InputContainer ref={ref} menuIsOpen={menuIsOpen}>
        <MultiSelected selected={selected} onRemoveValue={onRemoveValue} />
        <InputStyle
          selected={selected !== undefined}
          {...rest}
          onKeyDown={onKeyDown}
        />
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
