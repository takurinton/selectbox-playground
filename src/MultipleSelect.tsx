import { Flex, Typography, useTheme } from "ingred-ui";
import React, {
  ChangeEvent,
  createRef,
  forwardRef,
  MouseEvent,
  TouchEvent,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { MultipleInput } from "./Input";
import { Option } from "./Option";
import { OptionType } from "./types";

type Props = {
  options: OptionType[];
  isDisabled?: boolean;
  isClearable?: boolean;
  defaultValue?: OptionType[] | null;
  menuIsOpen: boolean;
  inputValue: string;
  optionsValue: OptionType[] | null;
  onFocusInput?: () => void;
  onBlurInput: () => void;
  onChangeInputValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (value: OptionType[] | null) => void;
  onClickOption: () => void;
  onMouseDownOption: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
  onClickSelectContainer: (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => void;
  onChangeSelected?: (value: OptionType[] | null) => void;
  onClearInput: () => void;
};

export const MultipleSelect = forwardRef<HTMLDivElement, Props>(
  (
    {
      options,
      defaultValue,
      isDisabled,
      menuIsOpen,
      inputValue,
      optionsValue,
      onFocusInput,
      onChangeInputValue,
      onBlurInput,
      onClearInput,
      onClickOption,
      onMouseDownOption,
      onClickSelectContainer,
      onChangeSelected,
      ...rest
    },
    ref
  ) => {
    const inputRef = createRef<HTMLInputElement>();
    const menuRef = createRef<HTMLDivElement>();
    const [selected, setSelected] = useState<OptionType[] | null>(
      defaultValue ?? null
    );

    const onPopValue = () => {
      const newValue = selected?.slice(0, -1) ?? null;
      setSelected(newValue);
      onChangeSelected && onChangeSelected(newValue);
    };

    const handleRemoveValue = (
      event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
      value: string | number
    ) => {
      event.preventDefault();
      const newValue =
        selected?.filter((s: OptionType) => s.value !== value) ?? null;
      setSelected(newValue);
      onChangeSelected && onChangeSelected(newValue);
    };

    const handleClickOption = useCallback(
      (data: OptionType) => {
        if (isDisabled) return;

        const newValue = [...(selected ?? []), data];
        setSelected(newValue);
        onChangeSelected && onChangeSelected(newValue);
        onFocusInput && onFocusInput();

        onClearInput();
        onClickOption();
      },
      [selected, menuIsOpen]
    );

    const handleClearValue = (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      if (
        event &&
        event.type === "mousedown" &&
        (event as React.MouseEvent<HTMLDivElement>).button !== 0
      ) {
        return;
      }

      setSelected(null);
      onChangeSelected && onChangeSelected(null);

      event.preventDefault();
      if (event.type === "touchend" && onFocusInput) {
        onFocusInput();
      } else {
        setTimeout(() => onFocusInput && onFocusInput());
      }
    };

    return (
      <Flex ref={ref}>
        <Flex onClick={onClickSelectContainer}>
          <MultipleInput
            ref={inputRef}
            readOnly={!menuIsOpen}
            menuIsOpen={menuIsOpen}
            type="text"
            value={inputValue}
            disabled={isDisabled}
            placeholder={
              selected == null || selected.length === 0 ? "select..." : ""
            }
            selected={selected}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInputValue}
            onClearValue={handleClearValue}
            onPopValue={onPopValue}
            handleRemoveValue={handleRemoveValue}
          />
          <Menu
            ref={menuRef}
            selected={selected}
            options={options}
            optionsValue={optionsValue ?? []}
            menuIsOpen={menuIsOpen}
            onClickOption={handleClickOption}
            onMouseDownOption={onMouseDownOption}
          />
        </Flex>
      </Flex>
    );
  }
);

const MenuContainer = styled.div`
  padding: ${({ theme }) => `${theme.spacing / 2}px 0`};
  border-radius: ${({ theme }) => `0 0 ${theme.radius}px ${theme.radius}px`};
  border: ${({ theme }) => `1px solid ${theme.palette.gray.main}`};
  border-top: none;
`;

const EmptyOptions = () => {
  const theme = useTheme();
  return (
    <Flex height="64px">
      <Typography color={theme.palette.gray.main} align="center">
        Not found
      </Typography>
    </Flex>
  );
};

type MenuProps = {
  selected: any | undefined;
  menuIsOpen: boolean;
  options: OptionType[];
  optionsValue: OptionType[];
  onClickOption: (data: OptionType) => void;
  onMouseDownOption: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
};

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      options,
      selected,
      menuIsOpen,
      optionsValue,
      onClickOption,
      onMouseDownOption,
    },
    ref
  ) => {
    const getMenuList = () => {
      if (selected == null) {
        return optionsValue.map(({ value, label }, index) => (
          <Option
            key={`${value}-${label}-${index}`}
            value={value}
            label={label}
            onClickOption={onClickOption}
            selected={selected?.value === value}
          />
        ));
      }

      if (selected.length === options.length) {
        return <EmptyOptions />;
      }

      const values = selected.map(
        ({ value }: { value: string | number }) => value
      );

      return optionsValue
        .filter(({ value }) => values.indexOf(value) === -1)
        .map(({ value, label }, index) => (
          <Option
            key={`${value}-${label}-${index}`}
            value={value}
            label={label}
            onClickOption={onClickOption}
            selected={selected?.value === value}
          />
        ));
    };

    return (
      <Flex ref={ref} onMouseDown={onMouseDownOption}>
        {menuIsOpen ? <MenuContainer>{getMenuList()}</MenuContainer> : null}
      </Flex>
    );
  }
);
