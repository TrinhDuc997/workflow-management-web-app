import { Box } from "@mui/material";
import React from "react";
import CalendarTree from "./CalendarTree";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { IconButton } from "@mui/material";
import { scrollbarBackgroundColorLightMode } from "../../utils/theme";

function SpaceLeft(props) {
  const { handleChangeDate, handleDrawerClose } = props;
  return (
    <Box
      width={"100%"}
      height={"100%"}
      overflow={"auto"}
      sx={{
        "&::-webkit-scrollbar": {
          backgroundColor: "background.default",
          position: "absolute",
          borderRadius: "10px",
          width: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "background.scrollColor",
          borderRadius: "10px",
        },
      }}
    >
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
