import React from "react";
import { Flex, Typography, useTheme } from "ingred-ui";

export const EmptyOptions = () => {
  const theme = useTheme();
  return (
    <Flex height="64px">
      <Typography color={theme.palette.gray.main} align="center">
        Not found
      </Typography>
    </Flex>
  );
};
