import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { FC, PropsWithChildren, createContext, useMemo, useState } from "react";

type ColorModeContextProps = {
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {
    throw new Error(
      'toggleColorMode is "undefined". Please provide a ColorModeContext Provider.'
    );
  },
});

const CustomThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<"dark" | "light">("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: mode === "light" ? "#627DE8" : "#829AE8",
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}> {children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
