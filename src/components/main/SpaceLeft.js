import { Box } from "@mui/system";
import React from "react";
import CalendarTree from "./CalendarTree";

function SpaceLeft(props) {
  const { handleChangeDate } = props;
  return (
    <Box width={"100%"} height={"100%"}>
      <CalendarTree handleChangeDate={handleChangeDate} />
    </Box>
  );
}

export default SpaceLeft;
