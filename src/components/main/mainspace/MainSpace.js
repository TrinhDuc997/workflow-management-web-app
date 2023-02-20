import { Divider, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateTask from "./CreateTask";
import ListHeader from "./ListHeader";

function MainSpace() {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="space-around"
      alignItems="stretch"
      height={"100%"}
    >
      <Paper sx={{ width: "30%", height: "100%" }}>
        <ListHeader title="Cần Làm" />
        <Box
          sx={{
            height: "calc(100% - 30px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              backgroundColor: "background.paper",
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
          <CreateTask />
        </Box>
      </Paper>
      <Paper sx={{ width: "30%" }}>
        <ListHeader title="Đang Làm" />
      </Paper>
      <Paper sx={{ width: "30%" }}>
        <ListHeader title="Làm Xong" />
      </Paper>
    </Stack>
  );
}

export default MainSpace;
