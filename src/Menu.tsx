import { Flex, Typography, useTheme } from "ingred-ui";
import { forwardRef, MouseEvent } from "react";
import styled from "styled-components";
import { Option } from "./Option";
import { OptionType } from "./types";

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
  isMulti: boolean;
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
      if (selected === undefined || !isMulti) {
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
