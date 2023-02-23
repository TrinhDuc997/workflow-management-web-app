import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

// Inspired by the former Facebook spinners.
function CircularLoading(props) {
  const { size } = props;
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "primary.main" : "primary.dark",
          animationDuration: "550ms",
          position: "absolute",
          left: `-${Number(size) / 2}px`,
          top: `-${Number(size) / 2}px`,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={5}
        {...props}
      />
    </Box>
  );
}

export default function LoadingComponent() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularLoading size={100} />
    </Box>
  );
}
