import { LoadingButton } from "@mui/lab";
import {
  Alert,
  ButtonBase,
  CardContent,
  Collapse,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  Modal,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { usersAPI } from "../../api";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Person } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateUserComponent from "./UpdateUserComponent";

function UserManage() {
  const [profile, setProfile] = useState({});

  const dataFetchedRef = useRef(false);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [usersList, setUsersList] = React.useState([]);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const [checkDataSave, setCheckDataSave] = React.useState(false);
  const [errorKey, setErrorKey] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openMessage, setOpenMessage] = React.useState(false);
  const [retCode, setRetCode] = React.useState(1);
  const [dataUserUpdate, setDataUserUpdate] = React.useState({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeProfile = (params = {}) => {
    setProfile({ ...profile, ...params });
  };
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMessage(false);
  };

  // componentDidMount - START
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchListUser = async () => {
      const usersData = await usersAPI.getListUsers();
      setUsersList((usersData || {}).users || []);
    };
    fetchListUser().catch(console.error);
  }, []);
  //componentDidMount - END

  const {
    userName = "",
    fullName = "",
    phoneNumber = "",
    address = "",
    password = "",
    reCheckPassword = "",
  } = profile;

  const handleAddNewUser = async () => {
    if (
      !profile.userName ||
      userName.indexOf(" ") !== -1 ||
      !profile.fullName ||
      !profile.password
    ) {
      setCheckDataSave(true);
    } else if (
      (!!password || !!reCheckPassword) &&
      password !== reCheckPassword
    ) {
      setCheckPassword(true);
    } else {
      const newProfile = {
        userName,
        fullName,
        phoneNumber,
        address,
        password,
      };
      setLoading(true);
      const newUser = await usersAPI.addUder(newProfile);
      if (newUser._id) {
        setUsersList([...usersList, { ...newUser }]);
        setRetCode(1);
        setProfile({});
        setOpenMessage(true);
      } else {
        setRetCode(0);
        setErrorKey((newUser.data || {}).keyPattern || {});
        setOpenMessage(true);
      }
      setLoading(false);
    }
  };
  const handleUpdateUser = (profile = {}) => {
    let listUserUpdated = [];
    usersList.forEach((item) => {
      if (item._id === profile._id) {
        listUserUpdated.push(profile);
      } else {
        listUserUpdated.push(item);
      }
    });
    setUsersList(listUserUpdated);
  };
  const handleDeleteUser = async (userId) => {
    const userDeleted = await usersAPI.deleteUser({ userId });
    let listUserUpdated = [];
    const { deletedUser = {} } = userDeleted;
    usersList.forEach((item) => {
      if (item._id !== deletedUser._id) {
        listUserUpdated.push(item);
      }
    });
    setUsersList(listUserUpdated);
    setOpenMessage(true);
    setRetCode(userDeleted.RetCode);
  };
  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      sx={{ m: "8px", maxWidth: "800px", overflow: "auto" }}
    >
      {usersList.map((i, index) => {
        return (
          <Paper
            key={index}
            sx={{ width: { md: "80%", xs: "88%" }, mb: "1rem", ml: "1rem" }}
          >
            <ButtonBase
              component="span"
              sx={{
                p: "5px",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "background.second",
                },
                width: "100%",
                justifyContent: "space-between",
              }}
              onClick={() => {
                handleOpen();
                setDataUserUpdate(i);
              }}
            >
              <Box display={"flex"}>
                <ListItemIcon sx={{ minWidth: "30px", ml: "8px" }}>
                  <Person fontSize="small" />
                </ListItemIcon>
                <Typography variant="subtitle2">{i.fullName}</Typography>
              </Box>
              <ButtonBase
                sx={{
                  padding: "5px",
                  height: "24px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteUser(i._id);
                }}
              >
                <DeleteForeverIcon
                  sx={{
                    "&:hover": {
                      color: "background.hover",
                    },
                  }}
                />
              </ButtonBase>
            </ButtonBase>
          </Paper>
        );
      })}
      <Paper sx={{ width: { md: "80%", xs: "88%" }, mb: "8px", ml: "1rem" }}>
        <ButtonBase
          sx={{
            p: "5px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "background.second",
            },
            width: "100%",
            justifyContent: "flex-start",
          }}
          onClick={() => {
            handleExpandClick();
          }}
        >
          <AddBoxOutlinedIcon />{" "}
          <Typography variant="subtitle2">Thêm Tài Khoản Mới</Typography>
        </ButtonBase>
      </Paper>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Tên Đăng Nhập</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <OutlinedInput
                  onChange={(e) => {
                    handleChangeProfile({ userName: e.target.value });
                    setErrorKey({ ...errorKey, userName: 0 });
                  }}
                  value={userName}
                  error={
                    (checkDataSave && !userName) ||
                    (checkDataSave && userName.indexOf(" ") !== -1) ||
                    errorKey.userName
                  }
                />
                <FormHelperText error>
                  {(checkDataSave && !userName) ||
                  (checkDataSave && userName.indexOf(" ") !== -1)
                    ? "Tên đăng nhập không được để trống và không được có khoảng trắng"
                    : ""}
                </FormHelperText>

                <FormHelperText error>
                  {errorKey.userName === 1
                    ? "Tên đăng nhập đã tồn tại vui lòng nhập tên đăng nhập khác"
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Họ và Tên</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <OutlinedInput
                  onChange={(e) => {
                    handleChangeProfile({ fullName: e.target.value });
                  }}
                  value={fullName}
                  error={checkDataSave && !fullName}
                />
                <FormHelperText error>
                  {checkDataSave && !fullName
                    ? "Họ và Tên không được để trống"
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Số Điện Thoại</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <TextField
                  type="text"
                  size="small"
                  onChange={(e) => {
                    handleChangeProfile({ phoneNumber: e.target.value });
                  }}
                  value={phoneNumber}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Địa Chỉ</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <OutlinedInput
                  onChange={(e) => {
                    handleChangeProfile({ address: e.target.value });
                  }}
                  value={address}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Mật Khẩu</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    handleChangeProfile({ password: e.target.value });
                  }}
                  value={password}
                  error={checkDataSave && !password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {checkDataSave && !password
                    ? "Mật khẩu không được để trống"
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container direction={"column"}>
            <Grid item sm>
              <Typography variant="body1">Nhập Lại Mật Khẩu</Typography>
            </Grid>
            <Grid item sm>
              <FormControl
                sx={{ width: { xs: "90%", md: "60%" } }}
                size="small"
              >
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    handleChangeProfile({ reCheckPassword: e.target.value });
                  }}
                  error={checkDataSave && !reCheckPassword}
                  value={reCheckPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {checkDataSave && !reCheckPassword
                    ? "Mật khẩu nhập lại không được để trống"
                    : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          {checkPassword && (
            <Typography variant="subtitle2" color={"error.main"}>
              Mật khẩu và mật khẩu nhập lại không khớp!
            </Typography>
          )}
          <Divider sx={{ m: "1rem", width: "90%" }} />
          <Grid item container justifyContent={"center"}>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              disableElevation
              // startIcon={<SaveIcon />}
              sx={{ width: "60%" }}
              onClick={() => {
                handleAddNewUser();
              }}
            >
              Thêm Tài Khoản
            </LoadingButton>
          </Grid>
        </CardContent>
      </Collapse>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid",
            boxShadow: 10,
            color: "text.primary",
            p: 4,
          }}
        >
          <UpdateUserComponent
            profile={dataUserUpdate}
            handleUpdateUser={handleUpdateUser}
            handleClose={handleClose}
          />
        </Box>
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
    </Grid>
  );
}

export default UserManage;
