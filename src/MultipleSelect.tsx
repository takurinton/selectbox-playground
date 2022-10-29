import { Flex } from "ingred-ui";
import React, {
  ChangeEvent,
  createRef,
  forwardRef,
  MouseEvent,
  TouchEvent,
  useCallback,
  useState,
} from "react";
import { MultipleInput } from "./utils/Input/MultipleInput/MultipleInput";
import { MultipleMenu } from "./utils/Menu/Menu";
import { OptionType } from "./types";

type Props = {
  options: OptionType[];
  isDisabled?: boolean;
  isClearable?: boolean;
  defaultValue?: OptionType[] | null;
  menuIsOpen: boolean;
  inputValue: string;
  optionsValue: OptionType[] | null;
  onFocusInput: () => void;
  onBlurInput: () => void;
  onChangeInputValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeValue: (value: OptionType[] | null) => void;
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
      onChangeValue,
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
      onChangeValue && onChangeValue(newValue);
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
      onChangeValue && onChangeValue(newValue);
    };

    const handleClickOption = useCallback(
      (data: OptionType) => {
        if (isDisabled) return;

        const newValue = [...(selected ?? []), data];
        setSelected(newValue);
        onChangeSelected && onChangeSelected(newValue);
        onChangeValue && onChangeValue(newValue);
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

      setSelected([]);
      onChangeSelected && onChangeSelected([]);
      onChangeValue && onChangeValue([]);

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
          <MultipleMenu
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
