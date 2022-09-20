import { Flex } from "ingred-ui";
import {
  ChangeEvent,
  createRef,
  forwardRef,
  MouseEvent,
  TouchEvent,
  useCallback,
  useState,
} from "react";
import { Input, MultipleInput } from "./Input";
import { Menu } from "./Menu";
import { OptionType } from "./types";

type SelectProps = {
  defaultValue?: OptionType | OptionType[];
  isMulti?: false;
  name?: string;
  selected: OptionType;
  options: OptionType[];
  isDisabled?: boolean;
};

type MultiSelectProps = {
  defaultValue?: OptionType[];
  isMulti: true;
  name?: string;
  selected: OptionType[];
  options: OptionType[];
  isDisabled?: boolean;
};

type Props = SelectProps | MultiSelectProps;

export const Select = forwardRef<HTMLDivElement, Props>(
  (
    { defaultValue, isMulti = false, name = "", options, isDisabled = false },
    ref
  ) => {
    const inputRef = createRef<HTMLInputElement>();
    const menuRef = createRef<HTMLDivElement>();
    const [inputValue, setInputValue] = useState("");
    const [optionsValue, setOptionsValue] = useState(options);
    const [selected, setSelected] = useState<any | undefined>(defaultValue);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // ==============================
    // Clear input value
    // ==============================
    const handleClearInput = useCallback(() => {
      setInputValue("");
    }, []);

    // ==============================
    // When isMulti is true, the selected element is cleared
    // ==============================
    const handleRemoveValue = useCallback(
      (
        event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
        value: string | number
      ) => {
        event.preventDefault();
        const newValue = selected.filter((s: OptionType) => s.value !== value);
        setSelected(newValue.length === 0 ? undefined : newValue);
      },
      [selected]
    );

    // ==============================
    // DOM Event Listners
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
    // Click option
    // ==============================
    const onClickOption = useCallback(
      (data: OptionType) => {
        if (isDisabled) return;

        if (isMulti) {
          if (!selected) {
            setSelected([data]);
          } else {
            setSelected([...selected, data]);
          }
        } else {
          setSelected(data);
        }

        if (menuIsOpen) {
          setMenuIsOpen(false);
        }

        onFocusInput();
        handleClearInput();
        setIsFocused(true);
        setOptionsValue(options);
      },
      [selected, menuIsOpen]
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

    // ==============================
    // Click button to clear all
    // ==============================
    const onClearValue = useCallback(
      (
        event:
          | React.MouseEvent<HTMLDivElement>
          | React.TouchEvent<HTMLDivElement>
      ) => {
        if (
          event &&
          event.type === "mousedown" &&
          (event as React.MouseEvent<HTMLDivElement>).button !== 0
        ) {
          return;
        }

        setSelected(undefined);
        event.preventDefault();
        if (event.type === "touchend") {
          onFocusInput();
        } else {
          setTimeout(() => onFocusInput());
        }
      },
      []
    );

    // =================================================================================
    // Pressing backspace while isMulti is true and focusing on <input /> pops selected.
    // =================================================================================
    const onPopValue = useCallback(() => {
      const newValue = selected.slice(0, -1);
      setSelected(newValue.length === 0 ? undefined : newValue);
    }, [selected]);

    return (
      <Flex ref={ref}>
        <Flex onClick={onClickSelectContainer}>
          {/* 
            TODO: この階層で渡してる props は全てユーザーにも提供する。

            e.g.
            const onChange = useCallback((event) => {
              if(props.onChange) {
                props.onChange(event);
              }
              // 処理
            }, [props.onChange, selected])
          */}
          {isMulti ? (
            <MultipleInput
              ref={inputRef}
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
              onClearValue={onClearValue}
              onPopValue={onPopValue}
              handleRemoveValue={handleRemoveValue}
            />
          ) : (
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
              onClearValue={onClearValue}
            />
          )}
          <Menu
            ref={menuRef}
            selected={selected}
            isMulti={isMulti}
            options={options}
            optionsValue={optionsValue}
            menuIsOpen={menuIsOpen}
            onClickOption={onClickOption}
            onMouseDownOption={onMouseDownOption}
          />
        </Flex>
      </Flex>
    );
  }
);
