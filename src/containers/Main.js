import { Box, Grid, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
// import theme from "../utils/theme";
import { useTheme } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import Hearder from "../components/main/Hearder";
import SpaceLeft from "../components/main/SpaceLeft";
import MainSpace from "../components/main/mainspace/MainSpace";
import moment from "moment";
import { tasksAPI, usersAPI } from "../api";
import { MainContext } from "../contexts";
import LoadingComponent from "../components/common/LoadingComponent";

function Main(props) {
  const { ColorModeContext } = props;
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYYMMDD"));
  const [tasksList, setTasksList] = useState();
  const dataFetchedRef = useRef(false);
  const [isLoading, setLoading] = useState(false);
  const [listUser, setListUsers] = React.useState([]);

  // componentDidMount - START
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchListTask = async () => {
      const params = {
        createDate: selectedDate,
      };
      const data = await tasksAPI.getListTasks(params);
      setTasksList((data || {}).tasksList || []);
    };
    fetchListTask().catch(console.error);

    const fetchListUser = async () => {
      const usersData = await usersAPI.getListUsers();
      setListUsers((usersData || {}).users || []);
    };
    fetchListUser().catch(console.error);
  }, [selectedDate]);
  //componentDidMount - END
  // handle change date --- START
  const handleChangeDate = (date = "") => {
    const fetchListTask = async () => {
      const params = {
        createDate: date,
      };
      setLoading(true);
      const data = await tasksAPI.getListTasks(params);
      setTasksList((data || {}).tasksList || []);
      setSelectedDate(date);
      setLoading(false);
    };
    fetchListTask().catch(console.error);
  };
  // handle change date --- END
  const handleAddTask = (params = []) => {
    setTasksList([...tasksList, ...params]);
  };

  const handleUpdate = (param = {}) => {
    let newTaskList = [];
    tasksList.forEach((element) => {
      if (element._id === param._id) {
        newTaskList.push(param);
      } else {
        newTaskList.push(element);
      }
    });
    setTasksList(newTaskList);
  };
  const handleUpdateListAfterRemoveTask = (params = {}) => {
    console.log(
      "🚀 ~ file: Main.js:77 ~ handleUpdateListAfterRemoveTask ~ params:",
      params
    );
    let newTaskList = [];
    tasksList.forEach((element) => {
      if (element._id !== params._id) {
        newTaskList.push(element);
      }
    });
    setTasksList(newTaskList);
  };
  const mainState = {
    selectedDate,
    listUser,
    handleUpdate,
    handleUpdateListAfterRemoveTask,
  };
  return (
    <MainContext.Provider value={mainState}>
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
              bgcolor: "background.default",
            }}
            container
            className="Header"
          >
            <Hearder theme={theme} colorMode={colorMode} />
          </Grid>
          <Grid item container height={"calc(100vh - 4rem)"}>
            <Grid container spacing={1} height={"100%"}>
              <Grid
                item
                sx={{
                  width: "300px",
                  borderRight: "0.5px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                  height: "100%",
                }}
                className="SpaceLeft"
              >
                <SpaceLeft handleChangeDate={handleChangeDate} />
              </Grid>
              <Grid
                item
                className="SpaceMain"
                sx={{
                  background: "background.gradient",
                  width: "calc(100% - 300px)",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Grid
                  item
                  sx={{
                    height: "35px",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={"900"}>
                    {moment(selectedDate).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
                <MainSpace
                  tasksList={tasksList}
                  handleAddTask={handleAddTask}
                />
                {isLoading && (
                  <Box
                    height={"calc(100% - 35px)"}
                    sx={{ position: "absolute", width: "100%", top: "35px" }}
                  >
                    <LoadingComponent />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainContext.Provider>
  );
}

export default Main;
