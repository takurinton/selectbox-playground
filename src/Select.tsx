import {
  ChangeEvent,
  createRef,
  forwardRef,
  MouseEvent,
  TouchEvent,
  useCallback,
  useState,
} from "react";
import { MultipleSelect } from "./MultipleSelect";
import { OptionType } from "./types";
import { SingleSelect } from "./SingleSelect";

type BaseProps = {
  name?: string;
  options: OptionType[];
  isDisabled?: boolean;
};

type SingleBaseProps = BaseProps & {
  isMulti?: false;
};

type MultipleBaseProps = BaseProps & {
  isMulti: true;
};

type SingleClearableProps = BaseProps &
  SingleBaseProps & {
    isClearable: true;
    defaultValue?: OptionType | null;
    // selected?: OptionType | null;
    onChange: (value: OptionType | null) => void;
  };

type SingleNotClearableProps = BaseProps &
  SingleBaseProps & {
    isClearable?: false;
    defaultValue?: OptionType;
    // selected: OptionType;
    onChange: (value: OptionType) => void;
  };

type MultipleClearableProps = BaseProps &
  MultipleBaseProps & {
    isClearable: true;
    defaultValue: OptionType[] | null;
    // selected?: OptionType[] | null;
    onChange: (value: OptionType[] | null) => void;
  };

type MultipleNotClearableProps = BaseProps &
  MultipleBaseProps & {
    isClearable?: false;
    defaultValue?: OptionType[];
    // selected: OptionType[];
    onChange: (value: OptionType[]) => void;
  };

export type SelectProps =
  | SingleClearableProps
  | SingleNotClearableProps
  | MultipleClearableProps
  | MultipleNotClearableProps;

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      defaultValue,
      isMulti = false,
      isClearable = false,
      isDisabled = false,
      name = "",
      options,
      onChange,
      ...rest
    },
    ref
  ) => {
    const inputRef = createRef<HTMLInputElement>();
    const [inputValue, setInputValue] = useState("");
    const [optionsValue, setOptionsValue] = useState(options);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // ==============================
    // Clear input value
    // ==============================
    const handleClearInput = useCallback(() => {
      setInputValue("");
    }, []);

    const handleClickOption = () => {
      if (menuIsOpen) {
        setMenuIsOpen(false);
      }

      setIsFocused(true);
      setOptionsValue(options);
    };

    // ==============================
    // DOM Event Handler
    // ==============================
    const onFocusInput = useCallback(() => {
      if (!inputRef) return;
      inputRef.current?.focus();
    }, [menuIsOpen]);

    const onBlurInput = useCallback(() => {
      if (!inputRef) return;
      inputRef.current?.blur();
      setMenuIsOpen(false);
      setIsFocused(false);
    }, [menuIsOpen]);

    // ==============================
    // Click option event
    // ==============================
    const onMouseDownOption = useCallback(
      (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        onFocusInput();
        setIsFocused(true);
      },
      []
    );

    // ==============================
    // Change input value
    // ==============================
    const onChangeInputValue = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setOptionsValue(
          options.filter((option) => option.label.indexOf(value) !== -1)
        );
      },
      [inputValue]
    );

    // ==============================
    // Click select container
    // ==============================
    const onClickSelectContainer = useCallback(
      (event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
        if (isDisabled) return;
        if (event.defaultPrevented) {
          return;
        }

        if (!isFocused) {
          setIsFocused(true);
          onFocusInput();
          setMenuIsOpen(true);
        } else {
          setIsFocused(false);
          setMenuIsOpen(false);
        }

        if (
          (event.target as HTMLElement).tagName !== "INPUT" &&
          (event.target as HTMLElement).tagName !== "TEXTAREA"
        ) {
          event.preventDefault();
        }
      },
      [isFocused, menuIsOpen]
    );

    if (isMulti) {
      return (
        <MultipleSelect
          {...rest}
          ref={ref}
          isDisabled={isDisabled}
          isClearable={isClearable}
          menuIsOpen={menuIsOpen}
          inputValue={inputValue}
          options={options}
          optionsValue={optionsValue}
          onClickSelectContainer={onClickSelectContainer}
          onChangeInputValue={onChangeInputValue}
          onClickOption={handleClickOption}
          onMouseDownOption={onMouseDownOption}
          onBlurInput={onBlurInput}
          onFocusInput={onFocusInput}
          onClearInput={handleClearInput}
          // TODO: Add type definition that takes `isClearable`
          onChangeValue={onChange}
        />
      );
    }

    return (
      <SingleSelect
        {...rest}
        ref={ref}
        isDisabled={isDisabled}
        isClearable={isClearable}
        menuIsOpen={menuIsOpen}
        inputValue={inputValue}
        options={options}
        optionsValue={optionsValue}
        onClickSelectContainer={onClickSelectContainer}
        onChangeInputValue={onChangeInputValue}
        onClickOption={handleClickOption}
        onMouseDownOption={onMouseDownOption}
        onBlurInput={onBlurInput}
        onFocusInput={onFocusInput}
        onClearInput={handleClearInput}
        // TODO: Add type definition that takes `isClearable`
        onChangeValue={onChange}
      />
    );
  }
);
