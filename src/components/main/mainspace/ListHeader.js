import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ListHeader(props = {}) {
  const { title = "" } = props;
  return (
    <Box
      sx={{ width: "100%", height: "30px", pl: "1rem", pr: "1rem", pt: "5px" }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Box>
  );
}

export default ListHeader;
