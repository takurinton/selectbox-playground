import { createTheme, Flex, ThemeProvider, Typography } from "ingred-ui";
import { useState } from "react";
import { Select } from "./Select";
import { OptionType } from "./types";

function App() {
  const theme = createTheme();

  const singleSelectOptions = [
    {
      label: "red",
      value: "red",
    },
    {
      label: "blue",
      value: "blue",
    },
    {
      label: "green",
      value: "green",
    },
  ];

  const multiSelectOptions = [
    {
      label: "red",
      value: "red",
    },
    {
      label: "blue",
      value: "blue",
    },
    {
      label: "green",
      value: "green",
    },
  ];

  const setSingleSelected = useState<OptionType | null>(null)[1];
  const setMultiSelected = useState<OptionType[] | null>([])[1];

  return (
    <ThemeProvider theme={theme}>
      <Flex>
        <Flex height="40vh">
          <Typography component="h2" size="xxxl" weight="bold">
            single
          </Typography>
          <Select
            name="colors"
            options={singleSelectOptions}
            isClearable={true}
            onChange={setSingleSelected}
          />
        </Flex>
        <Flex height="40vh">
          <Typography component="h2" size="xxxl" weight="bold">
            multiple
          </Typography>
          <Select
            name="colors"
            isMulti
            isClearable={true}
            options={multiSelectOptions}
            onChange={setMultiSelected}
          />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
