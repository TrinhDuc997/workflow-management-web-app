import { green, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
// const theme2 = React.useMemo(() => createTheme({}));
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: green[600],
            light: green[200],
            dark: green[800],
            // gradient: `linear-gradient(to right bottom, ${green[800]}, ${green[500]})`,
            contrastText: "#fff",
          },
          divider: grey[400],
          background: {
            default: grey[100],
            second: grey[200],
            paper: grey[300],
          },
          text: {
            primary: grey[900],
            secondary: grey[600],
            textColor: green[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: green[600],
            light: green[200],
            dark: green[800],
            // gradient: `linear-gradient(to right bottom, ${green[800]}, ${green[500]})`,
            contrastText: "#fff",
          },
          divider: grey[300],
          background: {
            default: green[700],
            second: green[800],
            paper: green[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[200],
            textColor: "#fff",
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
      // gradient: `linear-gradient(to right bottom, ${green[800]}, ${green[500]})`,
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
