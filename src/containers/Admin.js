import {
  Box,
  ButtonBase,
  Drawer,
  Grid,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Hearder from "../components/main/Hearder";
import { tasksAPI, usersAPI } from "../api";
import { MainContext } from "../contexts";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LeftMenu from "../components/admin/LeftMenu";
import ViewProfile from "../components/admin/ViewProfile";
import UserManage from "../components/admin/UserManage";
import { useLocation } from "react-router-dom";

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

function Admin(props) {
  const location = useLocation();
  console.log("🚀 ~ file: Admin.js:46 ~ Admin ~ location:", location);
  const { showPanelSelected = "VIEWPROFILE" } = location.state || {};
  const { ColorModeContext } = props;
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const dataFetchedRef = useRef(false);
  const refMainDrawer = useRef();
  const [showPanel, setShowPanel] = React.useState(showPanelSelected);

  // componentDidMount - START
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    //Add addEventListener for element <MainDrawer/> --- START
    if (window.innerWidth < 900) {
      const mainElement = refMainDrawer.current;
      mainElement.addEventListener("click", () => {
        setOpenDrawer(false);
      });
    }
    //Add addEventListener for element <MainDrawer/> --- END
  }, []);

  //componentDidMount - END

  const adminState = {};

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
    <MainContext.Provider value={adminState}>
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
                      sx={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                        zIndex: 999,
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <LeftMenu
                      setShowPanel={setShowPanel}
                      handleDrawerClose={handleDrawerClose}
                    />
                  </Box>
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
                    overflow: "auto",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      height: "35px",
                      display: "flex",
                      pl: "8px",
                      pr: "8px",
                      justifyContent: "flex-start",
                      position: "sticky",
                      top: 0,
                      bgcolor: "background.default",
                      zIndex: 99,
                    }}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={{ ml: 2, ...(openDrawer && { display: "none" }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    {showPanel === "VIEWPROFILE" && (
                      <Typography variant="h6" fontWeight={800}>
                        Tài Khoản Của Bạn
                      </Typography>
                    )}
                    {showPanel === "USERMANAGE" && (
                      <Typography variant="h6" fontWeight={800}>
                        Quản Lý Tài Khoản
                      </Typography>
                    )}
                  </Grid>
                  {showPanel === "VIEWPROFILE" && <ViewProfile />}
                  {showPanel === "USERMANAGE" && <UserManage />}
                </Grid>
              </MainDrawer>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainContext.Provider>
  );
}

export default Admin;
