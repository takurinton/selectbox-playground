import { createTheme, Flex, ThemeProvider, Typography } from "ingred-ui";
import { useEffect, useState } from "react";
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

  const multiSelectOptions: OptionType[] = [
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

  const [singleSelected, setSingleSelected] = useState<OptionType | null>(null);
  const [multiSelected, setMultiSelected] = useState<OptionType[] | null>([]);

  useEffect(() => {
    console.log("singleSelected", singleSelected);
  }, [singleSelected]);

  useEffect(() => {
    console.log("multiSelected", multiSelected);
  }, [multiSelected]);

  return (
    <ThemeProvider theme={theme}>
      <Flex>
        <Flex height="40vh">
          <Typography component="h2" size="xxxl" weight="bold">
            single
          </Typography>
          <Select
            name="colors"
            isClearable
            defaultValue={singleSelected}
            options={singleSelectOptions}
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
            isClearable
            defaultValue={multiSelected}
            options={multiSelectOptions}
            onChange={setMultiSelected}
          />
        </Flex>
      </Flex>
    </ThemeProvider>
  );
}

export default App;
