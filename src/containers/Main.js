import {
  Box,
  ButtonBase,
  Drawer,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import MonthReport from "../components/main/mainspace/MonthReport/MonthReport";
import action from "../utils/actionCommon";
import { socket } from "../socket";

const drawerWidth = 300;
const MainDrawer = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  height: "100%",
  overflowX: "auto",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function Main(props) {
  const { ColorModeContext } = props;
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYYMMDD"));
  const [tasksList, setTasksList] = useState([]);
  const [tasksListAccordingDay, setTasksListAccordingDay] = useState([]);
  const dataFetchedRef = useRef(false);
  const refMainDrawer = useRef();
  const [isLoading, setLoading] = useState(false);
  const [selectedIsMonth, setSelectedIsMonth] = useState(false);
  const [listUser, setListUsers] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { roles = [] } = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const checkPermitViewReport = action.checkPermission(roles, "view_report");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleUpdate = (param = {}) => {
    let newTaskList = [];
    if (!!param._id) {
      setTasksList((tasksList = []) => {
        tasksList.forEach((element) => {
          if (element._id === param._id) {
            newTaskList.push(param);
          } else {
            newTaskList.push(element);
          }
        });
        return newTaskList;
      });
    }
  };
  const handleAddTask = (params = []) => {
    setTasksList((tasksList) => [...tasksList, ...params]);
  };
  const handleUpdateListAfterRemoveTask = (params = {}) => {
    setTasksList((tasksList) => {
      let newTaskList = [];
      tasksList.forEach((element) => {
        if (element._id !== params._id) {
          newTaskList.push(element);
        }
      });
      return newTaskList;
    });
  };

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

    //Add addEventListener for element <MainDrawer/> --- START
    if (window.innerWidth < 900) {
      const mainElement = refMainDrawer.current;
      mainElement.addEventListener("click", () => {
        setOpenDrawer(false);
      });
    }
    //Add addEventListener for element <MainDrawer/> --- END

    // Register listent event socket --- START
    socket.on("task-updated", (params) => {
      handleUpdate(params.task || {});
    });
    socket.on("task-created", (params) => {
      handleAddTask(params);
    });
    socket.on("task-deleted", (params) => {
      handleUpdateListAfterRemoveTask(params);
    });
    // Register listent event socket --- END

    // return () => {
    //   console.log("remove component");
    //   socket.off("task-updated");
    // };
  }, [selectedDate]);

  //componentDidMount - END

  // handle change date --- START
  const handleChangeDate = (date = "") => {
    const fetchListTask = async () => {
      const params = {
        createDate: date,
      };
      if (window.innerWidth < 900) {
        setOpenDrawer(false);
      }
      setLoading(true);
      const data = await tasksAPI.getListTasks(params);
      setTasksList((data || {}).tasksList || []);
      setSelectedDate(date);

      setLoading(false);
      setSelectedIsMonth(false);
    };
    fetchListTask().catch(console.error);
  };
  const handleChangeDateToGetReportMonth = useCallback((month = "") => {
    const fetchListTask = async () => {
      const params = {
        monthSelected: month,
      };
      if (window.innerWidth < 900) {
        setOpenDrawer(false);
      }
      setLoading(true);
      const data = await tasksAPI.getListTaskAccordingMonth(params);
      setTasksListAccordingDay((data || {}).tasksListAccrodingDay || []);
      setSelectedDate(month);

      setLoading(false);
      setSelectedIsMonth(true);
    };
    fetchListTask().catch(console.error);
  });
  // handle change date --- END

  const mainState = {
    selectedDate,
    listUser,
    handleUpdate,
    handleUpdateListAfterRemoveTask,
    handleChangeDateToGetReportMonth,
  };

  // handle calculate total amount --- START
  let totalAmountTask = 0,
    TotalAmountMaterial = 0;
  if (selectedIsMonth && checkPermitViewReport) {
    for (const day in tasksListAccordingDay) {
      const taskData = tasksListAccordingDay[day] || [];
      taskData.forEach((i) => {
        const { unitPrice, quantity, materials } = i || {};
        totalAmountTask += unitPrice * quantity;
        materials.forEach((subI) => {
          const { unitPrice, quantity = 0 } = subI || {};
          TotalAmountMaterial += unitPrice * quantity;
        });
      });
    }
  } else {
    tasksList.forEach((i) => {
      const { unitPrice = 0, quantity = 0, materials = [] } = i || {};
      totalAmountTask += unitPrice * quantity;
      materials.forEach((subI) => {
        const { unitPrice, quantity = 0 } = subI || {};
        TotalAmountMaterial += unitPrice * quantity;
      });
    });
  }

  // handle calculate total amount --- END

  // handle Drawer --- START
  const [openDrawer, setOpenDrawer] = React.useState(
    window.innerWidth < 900 ? false : true
  );

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  // handle Drawer --- END

  return (
    <MainContext.Provider value={mainState}>
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
        height={{ md: "100vh", xs: "90vh" }}
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
          <Grid
            item
            container
            height={{ md: "calc(100vh - 4rem)", xs: "calc(90vh - 4rem)" }}
          >
            <Grid container spacing={1} height={"100%"} flexWrap={"nowrap"}>
              <Drawer
                sx={{
                  width: drawerWidth,
                  height: "100%",
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                PaperProps={{
                  sx: {
                    position: "relative",
                    borderRadius: "0px",
                    overflowX: "hidden",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={openDrawer}
              >
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
                  <SpaceLeft
                    handleChangeDate={handleChangeDate}
                    handleDrawerClose={handleDrawerClose}
                  />
                </Grid>
              </Drawer>
              <MainDrawer ref={refMainDrawer} id="MainDrawer" open={openDrawer}>
                <Grid
                  item
                  className="SpaceMain"
                  sx={{
                    width: `calc(100%)`,
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      height: "35px",
                      display: "flex",
                      pl: "8px",
                      pr: "8px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={"900"}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ ml: 2, ...(openDrawer && { display: "none" }) }}
                      >
                        <MenuIcon />
                      </IconButton>
                      {selectedIsMonth && checkPermitViewReport
                        ? moment(selectedDate).format("MM/YYYY")
                        : moment(selectedDate).format("DD/MM/YYYY")}
                    </Typography>
                    <ButtonBase
                      aria-describedby={id}
                      variant="contained"
                      onClick={handleClick}
                    >
                      {selectedIsMonth && checkPermitViewReport ? (
                        <Typography
                          variant="subtitle1"
                          fontWeight={"900"}
                          sx={{ display: { xs: "none", md: "block" } }}
                        >
                          Tổng tiền trong tháng:{" "}
                          {Number(
                            totalAmountTask - TotalAmountMaterial
                          ).toLocaleString()}{" "}
                          VND
                        </Typography>
                      ) : (
                        <Typography
                          variant="subtitle1"
                          fontWeight={"900"}
                          sx={{ display: { xs: "none", md: "block" } }}
                        >
                          Tổng tiền trong ngày:{" "}
                          {Number(
                            totalAmountTask - TotalAmountMaterial
                          ).toLocaleString()}{" "}
                          VND
                        </Typography>
                      )}
                      <InfoIcon sx={{ display: { xs: "block", md: "none" } }} />
                    </ButtonBase>

                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <Box p={"1rem"}>
                        <Typography variant="subtitle1">
                          Tổng tiền công việc:{" "}
                          {totalAmountTask.toLocaleString()} VND
                        </Typography>
                        <Typography variant="subtitle1">
                          Tổng tiền nguyên vật liệu:{" "}
                          {TotalAmountMaterial.toLocaleString()} VND
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight={"900"}
                          sx={{ display: { xs: "block", md: "none" } }}
                        >
                          Tổng tiền trong ngày:{" "}
                          {Number(
                            totalAmountTask - TotalAmountMaterial
                          ).toLocaleString()}{" "}
                          VND
                        </Typography>
                      </Box>
                    </Popover>
                  </Grid>
                  {selectedIsMonth && checkPermitViewReport ? (
                    <MonthReport
                      listTaskAccordingMonth={tasksListAccordingDay}
                    />
                  ) : (
                    <MainSpace
                      tasksList={tasksList}
                      handleAddTask={handleAddTask}
                    />
                  )}
                  {isLoading && (
                    <Box
                      height={"calc(100% - 35px)"}
                      sx={{ position: "absolute", width: "100%", top: "35px" }}
                    >
                      <LoadingComponent />
                    </Box>
                  )}
                </Grid>
              </MainDrawer>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainContext.Provider>
  );
}

export default Main;
