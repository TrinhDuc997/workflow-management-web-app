import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Main from "./containers/Main";
import Admin from "./containers/Admin";
import Login from "./components/authentication/Login";
// import { ThemeProvider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./utils/theme";
import theme from "./utils/theme";
// import { GlobalStyles } from "@mui/styled-engine";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Render component if token is valid
    return children;
  }
  // Redirect to login page if user is not authenticated
  return <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main ColorModeContext={ColorModeContext} />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin ColorModeContext={ColorModeContext} />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    ),
  },
]);

function App() {
  const [mode, setMode] = React.useState(
    localStorage.getItem("prevMode") || "dark"
  );
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          localStorage.setItem(
            "prevMode",
            prevMode === "light" ? "dark" : "light"
          );
          return prevMode === "light" ? "dark" : "light";
        });
      },
    }),
    []
  );

  const themeMode = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );
  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={themeMode}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
