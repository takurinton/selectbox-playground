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
import { Input } from "./utils/Input/Input/Input";
import { SingleMenu } from "./utils/Menu/Menu";
import { OptionType } from "./types";

type SingleSelectBase = {
  name?: string;
  options: OptionType[];
  isDisabled?: boolean;
  defaultValue?: OptionType | null;
  menuIsOpen: boolean;
  inputValue: string;
  optionsValue: OptionType[] | null;
  onFocusInput?: () => void;
  onBlurInput: () => void;
  onChangeInputValue?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickOption: () => void;
  onMouseDownOption: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
  onClickSelectContainer: (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => void;
  onClearInput: () => void;
};

type SingleClearableSelectProps = SingleSelectBase & {
  isClearable?: true;
  onChangeValue?: (value: OptionType | null) => void;
};

type SingleNotClearableSelectProps = SingleSelectBase & {
  isClearable?: false;
  onChangeValue?: (value: OptionType) => void;
};

type Props = SingleClearableSelectProps | SingleNotClearableSelectProps;

export const SingleSelect = forwardRef<HTMLDivElement, Props>(
  (
    {
      name,
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
      onChangeValue,
      ...rest
    },
    ref
  ) => {
    const inputRef = createRef<HTMLInputElement>();
    const menuRef = createRef<HTMLDivElement>();
    const [selected, setSelected] = useState<OptionType | null>(
      defaultValue ?? null
    );

    const handleClickOption = useCallback(
      (data: OptionType) => {
        if (isDisabled) return;

        setSelected(data);
        onChangeValue && onChangeValue(data);
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
      onChangeValue && onChangeValue(null);

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
          <Input
            ref={inputRef}
            name={name}
            readOnly={!menuIsOpen}
            menuIsOpen={menuIsOpen}
            type="text"
            value={inputValue}
            disabled={isDisabled}
            placeholder={selected ? selected.label : "select..."}
            selected={selected}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            onChange={onChangeInputValue}
            onClearValue={handleClearValue}
          />
          <SingleMenu
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
