import { green, grey, red, blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app

// Constant Color --- START

const scrollbarBackgroundColorDarkMode = "#003872";
const scrollbarBackgroundColorLightMode = green[200];
// Constant Color --- END

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: green[600],
          },
          divider: green[600],
          background: {
            default: grey[100],
            second: green[200],
            paper: grey[200],
            hover: green[50],
          },
          text: {
            primary: green[800],
            secondary: green[600],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: blue[500],
          },
          divider: blue[500],
          background: {
            default: "#0a1929",
            second: grey[800],
            paper: "#011e3c",
            hover: "#2196f352",
          },
          text: {
            primary: grey[100],
            secondary: green[300],
          },
        }),
  },
  components: {
    mode,
    ...(mode === "light"
      ? {
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: green[800],
              },
            },
          },
          MuiYearPicker: {
            styleOverrides: {
              root: {
                "&::-webkit-scrollbar": {
                  backgroundColor: "background.default",
                  position: "absolute",
                  borderRadius: "10px",
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: scrollbarBackgroundColorLightMode,
                  borderRadius: "10px",
                },
              },
            },
          },
          MuiTreeView: {
            styleOverrides: {
              root: {
                "&::-webkit-scrollbar": {
                  backgroundColor: "background.default",
                  position: "absolute",
                  borderRadius: "10px",
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: scrollbarBackgroundColorLightMode,
                  borderRadius: "10px",
                },
              },
            },
          },
          MuiTreeItem: {
            styleOverrides: {
              root: {
                ".Mui-selected": {
                  backgroundColor: scrollbarBackgroundColorLightMode,
                  borderRadius: "10px",
                },
              },
            },
          },
        }
      : {
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: grey[100],
              },
            },
          },
          MuiYearPicker: {
            styleOverrides: {
              root: {
                "&::-webkit-scrollbar": {
                  backgroundColor: "background.default",
                  position: "absolute",
                  visibility: "collapse",
                  borderRadius: "10px",
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: scrollbarBackgroundColorDarkMode,
                  borderRadius: "10px",
                },
              },
            },
          },
          MuiTreeView: {
            styleOverrides: {
              root: {
                "&::-webkit-scrollbar": {
                  backgroundColor: "background.default",
                  position: "absolute",
                  borderRadius: "10px",
                  width: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: scrollbarBackgroundColorDarkMode,
                  borderRadius: "10px",
                },
              },
            },
          },
          MuiTreeItem: {
            styleOverrides: {
              root: {
                ".Mui-selected": {
                  backgroundColor: scrollbarBackgroundColorDarkMode,
                  borderRadius: "10px",
                },
              },
            },
          },
        }),
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
      light: green[200],
      dark: green[800],
      contrastText: "#fff",
    },
    error: {
      light: red[200],
      main: red[400],
      dark: red[600],
    },
  },
});

export default theme;
