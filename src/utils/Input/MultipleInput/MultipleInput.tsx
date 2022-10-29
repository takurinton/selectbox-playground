import { Icon } from "ingred-ui";
import {
  forwardRef,
  InputHTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  TouchEvent,
  useCallback,
} from "react";
import { OptionType } from "../../../types";
import { MultiSelected } from "./internal/MultiSelected";
import {
  DropdownIndicator,
  IconButton,
  IconContainer,
  InputContainer,
  InputStyle,
} from "../styled";

type MultipleInputProps<T> = {
  selected: OptionType[] | null;
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
          selected !== null &&
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
            {selected !== null ? (
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
