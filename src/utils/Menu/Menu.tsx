import { Flex } from "ingred-ui";
import { forwardRef, MouseEvent } from "react";
import { Option } from "./internal/Option";
import { OptionType } from "../../types";
import { EmptyOptions } from "./internal/EmptyOptions";
import { MenuContainer } from "./styled";

type MenuBase = {
  options: OptionType[];
  menuIsOpen: boolean;
  optionsValue: OptionType[];
  onClickOption: (data: OptionType) => void;
  onMouseDownOption: (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => void;
};

type SingleMenuProps = MenuBase & {
  selected: OptionType | null;
};

type MultiMenuProps = MenuBase & {
  selected: OptionType[] | null;
};

// type MenuProps = SingleMenuProps | MultiMenuProps;

// export const Menu = forwardRef<HTMLDivElement, MenuProps>(
//   (
//     {
//       options,
//       isMulti,
//       selected,
//       menuIsOpen,
//       optionsValue,
//       onClickOption,
//       onMouseDownOption,
//     },
//     ref
//   ) => {
//     if (isMulti) {
//       return (
//         <MultipleMenu
//           ref={ref}
//           isMulti
//           options={options}
//           selected={selected}
//           menuIsOpen={menuIsOpen}
//           optionsValue={optionsValue}
//           onClickOption={onClickOption}
//           onMouseDownOption={onMouseDownOption}
//         />
//       );
//     }
//     return (
//       <SingleMenu
//         ref={ref}
//         isMulti={false}
//         options={options}
//         selected={selected}
//         menuIsOpen={menuIsOpen}
//         optionsValue={optionsValue}
//         onClickOption={onClickOption}
//         onMouseDownOption={onMouseDownOption}
//       />
//     );
//   }
// );

export const SingleMenu = forwardRef<HTMLDivElement, SingleMenuProps>(
  (
    { selected, menuIsOpen, optionsValue, onClickOption, onMouseDownOption },
    ref
  ) => (
    <Flex ref={ref} onMouseDown={onMouseDownOption}>
      {menuIsOpen ? (
        <MenuContainer>
          {optionsValue.map(({ value, label }, index) => (
            <Option
              key={`${value}-${label}-${index}`}
              value={value}
              label={label}
              onClickOption={onClickOption}
              selected={selected?.value === value}
            />
          ))}
        </MenuContainer>
      ) : (
        <></>
      )}
    </Flex>
  )
);

export const MultipleMenu = forwardRef<HTMLDivElement, MultiMenuProps>(
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
          />
        ));
      }

      if (selected?.length === options?.length) {
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
