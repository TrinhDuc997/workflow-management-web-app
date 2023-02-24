import {
  Alert,
  Avatar,
  ButtonBase,
  Grid,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { forwardRef, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";
import UpdateTask from "./UpdateTask";
import { MainContext } from "../../../contexts";
import { tasksAPI } from "../../../api";
import { LoadingButton } from "@mui/lab";
// Handle name user - START
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name = "") {
  return `${name.split(" ")[0][0]}${
    name.split(" ")[name.split(" ").length - 1][0]
  }`;
}

function invertColor(hexColor) {
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }
  // convert hex color to decimal value
  let decimalColor = parseInt(hexColor, 16);
  // invert the color
  let invertedDecimalColor = 0x00ffffff - decimalColor;
  // convert the inverted decimal color back to hex
  let invertedHexColor = invertedDecimalColor.toString(16);
  // add leading zeros if needed
  invertedHexColor = ("000000" + invertedHexColor).slice(-6);
  // add the "#" prefix
  invertedHexColor = "#" + invertedHexColor;
  return invertedHexColor;
}
// Handle name user - END

const TaskItem = forwardRef((props, ref) => {
  const { detailTask = {} } = props;
  const {
    taskName = "",
    assignedTo = {},
    unitPrice,
    status,
    materials = [],
  } = detailTask;
  const { fullName = "" } = assignedTo || {};
  const mainState = useContext(MainContext);
  const { handleUpdate, handleUpdateListAfterRemoveTask } = mainState;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };
  let totalAmountMaterial = 0;
  materials.forEach((element) => {
    const { unitPrice } = element || {};
    totalAmountMaterial += unitPrice;
  });
  //handle Menu START
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //handle Menu START

  const [openMessage, setOpenMessage] = React.useState(false);
  const [retCode, setRetCode] = React.useState(1);
  const [isSave, setIsSave] = React.useState(false);

  // handle update status task --- START
  const handleUpdateStatusTask = async (params) => {
    setIsSave(true);
    const saveData = await tasksAPI.editTask({
      taskId: detailTask._id,
      taskData: {
        ...detailTask,
        ...params,
        assignedTo: assignedTo.id || null,
      },
    });
    setIsSave(false);

    if (saveData.RetCode === 1) {
      handleUpdate(saveData.task);
      // handle reset field --- end
      setOpenMessage(true);
      setRetCode(1);
      handleCloseMenu();
    } else {
      setRetCode(0);
      setOpenMessage(true);
      handleCloseMenu();
    }
  };
  // handle update status task --- END

  // handle remove task --- START
  const handleRemoveTask = async () => {
    setIsSave(true);
    const dataDelete = await tasksAPI.deleteTask({ taskId: detailTask._id });
    setIsSave(false);

    if (dataDelete.RetCode === 1) {
      handleUpdateListAfterRemoveTask(dataDelete.deletedTask);
      // handle reset field --- end
      setOpenMessage(true);
      setRetCode(1);
    } else {
      setRetCode(0);
      setOpenMessage(true);
    }
  };
  // handle remove task --- END
  return (
    <Paper sx={{ mb: "1rem", width: "100%" }}>
      <ButtonBase
        component="span"
        sx={{ width: "100%" }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <Grid
          direction={"column"}
          container
          spacing={2}
          sx={{ width: "100%", m: "0px" }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            item
            sx={{ p: "8px", textAlign: "right" }}
          >
            <Box>
              {!!fullName && (
                <Avatar
                  sx={{
                    bgcolor: stringToColor(fullName),
                    color: invertColor(stringToColor(fullName)),
                  }}
                >
                  {stringAvatar(fullName)}
                </Avatar>
              )}
            </Box>

            <LoadingButton
              loading={isSave}
              sx={{
                p: "0px",
                minWidth: "40px",
                minHeight: "40px",
              }}
              aria-label="detail"
              size="large"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {!isSave && (
                <MoreHorizIcon
                  fontSize="large"
                  sx={{ fontSize: "30px !important" }}
                />
              )}
            </LoadingButton>
          </Grid>
          <Grid item container sx={{ p: "8px" }}>
            <Grid xs direction={"column"} item container>
              <Grid item>
                <Typography variant="body1">{taskName}</Typography>
              </Grid>
            </Grid>
            <Grid xs direction={"column"} item container pl={"5px"}>
              <Grid item container direction={"column"}>
                <Grid item container justifyContent={"space-between"}>
                  <Typography variant="body1">Giá:</Typography>
                  <Typography variant="body1">
                    {Number(unitPrice).toLocaleString()} VND
                  </Typography>
                </Grid>
                <Grid item container justifyContent={"space-between"}>
                  <Tooltip title="Tổng tiền mua nguyên vật liệu">
                    <Typography variant="body1">Tiền NVL:</Typography>
                  </Tooltip>
                  <Typography variant="body1">
                    {Number(totalAmountMaterial).toLocaleString()} VND
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ButtonBase>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <UpdateTask
          setOpenMessage={setOpenMessage}
          setRetCode={setRetCode}
          handleCloseModal={handleClose}
          detailTask={detailTask}
        />
      </Modal>
      <Snackbar
        open={openMessage}
        autoHideDuration={5000}
        onClose={handleCloseMessage}
      >
        <Alert
          onClose={handleCloseMessage}
          severity={retCode === 1 ? "success" : "error"}
          sx={{
            width: "250px",
            border: "1px solid",
            borderColor: retCode === 1 ? "green" : "red",
          }}
        >
          {retCode === 1 ? "Save Success..." : "Save Error..."}
        </Alert>
      </Snackbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {status !== "todo" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatusTask({ status: "todo" });
            }}
          >
            Cần Làm
          </MenuItem>
        )}
        {status !== "doing" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatusTask({ status: "doing" });
            }}
          >
            Đang Làm
          </MenuItem>
        )}
        {status !== "done" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatusTask({ status: "done" });
            }}
          >
            Làm Xong
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleRemoveTask();
          }}
        >
          Xóa
        </MenuItem>
      </Menu>
    </Paper>
  );
});

export default TaskItem;
