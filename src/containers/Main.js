import { Box, Grid, Typography } from "@mui/material";
import React from "react";
// import theme from "../utils/theme";
import { useTheme } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import Hearder from "../components/main/Hearder";
function Main(props) {
  const { ColorModeContext } = props;
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      height={"100vh"}
    >
      <Grid container spacing={1} direction="column" sx={{ mt: "0px" }}>
        <Grid
          item
          minHeight="4rem"
          sx={{
            borderBottom: "0.5px solid",
            borderColor: "divider",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "background.second",
          }}
          container
          className="Header"
        >
          <Hearder theme={theme} colorMode={colorMode} />
        </Grid>
        <Grid item container height={"calc(100vh - 4rem)"}>
          <Grid container spacing={1}>
            <Grid
              item
              sx={{
                width: "300px",
                borderRight: "0.5px solid",
                borderColor: "divider",
                bgcolor: "background.second",
              }}
              className="SpaceLeft"
            ></Grid>
            <Grid
              item
              className="SpaceRight"
              sx={{
                background: "background.gradient",
                width: "calc(100% - 300px)",
              }}
            ></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Main;
