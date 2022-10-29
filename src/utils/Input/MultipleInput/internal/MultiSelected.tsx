import { Icon } from "ingred-ui";
import { forwardRef, MouseEvent, TouchEvent } from "react";
import { OptionType } from "../../../../types";
import {
  MultiRemoveIcon,
  MultiSelectContainer,
  MultiSelectedStyle,
} from "./styled";

type MultiSelectedProps = {
  onRemoveValue: (
    event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    value: string | number
  ) => void;
  selected: any;
};

export const MultiSelected = forwardRef<HTMLDivElement, MultiSelectedProps>(
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
