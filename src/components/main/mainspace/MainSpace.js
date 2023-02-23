import { Divider, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CreateTask from "./CreateTask";
import ListHeader from "./ListHeader";
import TasksList from "./TasksList";

function MainSpace(props) {
  const { tasksList = [], handleAddTask } = props;
  const ListTodo = tasksList.filter((i) => i.status === "todo");
  const ListDoing = tasksList.filter((i) => i.status === "doing");
  const ListDone = tasksList.filter((i) => i.status === "done");
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="space-around"
      alignItems="stretch"
      height={"calc(100% - 35px)"}
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
          <TasksList tasksList={ListTodo} />
          <CreateTask handleAddTask={handleAddTask} />
        </Box>
      </Paper>
      <Paper sx={{ width: "30%" }}>
        <ListHeader title="Đang Làm" />
        <TasksList tasksList={ListDoing} />
      </Paper>
      <Paper sx={{ width: "30%" }}>
        <ListHeader title="Làm Xong" />
        <TasksList tasksList={ListDone} />
      </Paper>
    </Stack>
  );
}

export default MainSpace;
