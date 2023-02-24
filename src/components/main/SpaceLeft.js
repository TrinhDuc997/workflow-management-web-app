import { Box } from "@mui/system";
import React from "react";
import CalendarTree from "./CalendarTree";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";

function SpaceLeft(props) {
  const { handleChangeDate, handleDrawerClose } = props;
  return (
    <Box width={"100%"} height={"100%"} overflow={"auto"}>
      <IconButton
        onClick={handleDrawerClose}
        sx={{ position: "absolute", right: "0px", zIndex: 999 }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <CalendarTree handleChangeDate={handleChangeDate} />
    </Box>
  );
}

export default SpaceLeft;
