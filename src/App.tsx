import { createTheme, Flex, Tabs, Typography } from "ingred-ui";
import { useState } from "react";
import { ThemeContext } from "styled-components";
import { Select } from "./Select";

function App() {
  const theme = createTheme();

  const [value, setValue] = useState("multi");
  const tabsOptions = {
    data: [
      { text: "single", value: "single" },
      { text: "multi", value: "multi" },
    ],
  };

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

  return (
    <ThemeContext.Provider value={theme}>
      <Flex>
        <Flex height="40vh">
          <Typography component="h2" size="xxxl" weight="bold">
            single
          </Typography>
          <Select name="colors" options={singleSelectOptions} />
        </Flex>
        <Flex height="40vh">
          <Typography component="h2" size="xxxl" weight="bold">
            multiple
          </Typography>
          <Select name="colors" isMulti options={multiSelectOptions} />
        </Flex>
      </Flex>
    </ThemeContext.Provider>
  );
}

export default App;
