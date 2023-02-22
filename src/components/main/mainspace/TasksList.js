import { Box, Stack } from "@mui/system";
import React from "react";
import TaskItem from "./TaskItem";

function TasksList(props) {
  const { tasksList = [] } = props;
  return (
    <Box>
      <Stack sx={{ pl: "1rem", pr: "1rem" }}>
        {tasksList.map((item) => {
          return <TaskItem key={item._id} detailTask={item} />;
        })}
      </Stack>
    </Box>
  );
}

export default TasksList;
