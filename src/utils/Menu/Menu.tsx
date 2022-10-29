import { Flex } from "ingred-ui";
import { forwardRef, MouseEvent } from "react";
import styled from "styled-components";
import { Option } from "./internal/Option";
import { OptionType } from "../../types";
import { EmptyOptions } from "./internal/EmptyOptions";
import { MenuContainer } from "./styled";

type MenuBase = {
  selected: any | undefined;
  menuIsOpen: boolean;
  options: OptionType[];
  optionsValue: OptionType[];
  onClickOption: (data: OptionType) => void;
  onMouseDownOption: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
};

type IsMultiMenuProps = MenuBase & {
  isMulti?: true;
};

type IsSingleMenuProps = MenuBase & {
  isMulti?: false;
};

type MenuProps = IsMultiMenuProps | IsSingleMenuProps;

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      options,
      isMulti,
      selected,
      menuIsOpen,
      optionsValue,
      onClickOption,
      onMouseDownOption,
    },
    ref
  ) => {
    const getMenuList = () => {
      if (selected == null || !isMulti) {
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
        {menuIsOpen ? <MenuContainer>{getMenuList()}</MenuContainer> : <></>}
      </Flex>
    );
  }
);
