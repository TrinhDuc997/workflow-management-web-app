import { LoadingButton } from "@mui/lab";
import {
  ButtonBase,
  CardContent,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { usersAPI } from "../../api";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function UpdateUserComponent(props) {
  const { handleUpdateUser, handleClose } = props;
  const [profile, setProfile] = useState(props.profile || {});

  const dataFetchedRef = useRef(false);
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [checkPassword, setCheckPassword] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { userName = "" } = JSON.parse(
    localStorage.getItem("dataUser") || "{}"
  );

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeProfile = (params = {}) => {
    setProfile({ ...profile, ...params });
  };

  // componentDidMount - START
  //   React.useEffect(() => {
  //     if (dataFetchedRef.current) return;
  //     dataFetchedRef.current = true;
  //     const fetchProfile = async () => {
  //       const userData = await usersAPI.getProfile({ userName });
  //       setProfile((userData || {}).user || {});
  //     };
  //     fetchProfile().catch(console.error);
  //   }, []);
  //componentDidMount - END

  const {
    fullName = "",
    phoneNumber = "",
    address = "",
    newPassword,
    reCheckNewPassword,
  } = profile;

  const updateProfile = async () => {
    const newProfile = {
      ...profile,
      userId: profile._id,
    };
    if (
      (!!newPassword || !!reCheckNewPassword) &&
      newPassword !== reCheckNewPassword
    ) {
      setCheckPassword(true);
    } else {
      setLoading(true);
      const dataUpdated = await usersAPI.updateProfile({ newProfile });
      setLoading(false);
      setProfile(dataUpdated.newProfile || {});
      handleUpdateUser(dataUpdated.newProfile || {});
      handleClose();
    }
  };

  return (
    <Grid
      container
      direction={"column"}
      spacing={2}
      sx={{ m: "0px", maxWidth: "800px", overflow: "auto" }}
    >
      <Grid item container direction={"column"}>
        <Grid item sm>
          <Typography variant="h5">Tài Khoản Của Bạn</Typography>
        </Grid>
      </Grid>
      <Grid item container direction={"column"}>
        <Grid item sm>
          <Typography variant="body1">Tên</Typography>
        </Grid>
        <Grid item sm>
          <FormControl sx={{ width: "60%" }} size="small">
            <OutlinedInput
              onChange={(e) => {
                handleChangeProfile({ fullName: e.target.value });
              }}
              value={fullName}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Divider sx={{ m: "1rem", width: "90%" }} />
      <Grid item container direction={"column"}>
        <Grid item sm>
          <Typography variant="body1">Số Điện Thoại</Typography>
        </Grid>
        <Grid item sm>
          <FormControl sx={{ width: "60%" }} size="small">
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
          <FormControl sx={{ width: "60%" }} size="small">
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
          <ButtonBase
            sx={{
              p: "5px",

              "&:hover": {
                backgroundColor: "background.second",
              },
              width: "80%",
              justifyContent: "flex-start",
            }}
            onClick={() => {
              handleExpandClick();
            }}
          >
            <AddBoxOutlinedIcon />{" "}
            <Typography variant="subtitle2">Cập Nhật Mật Khẩu</Typography>
          </ButtonBase>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <FormControl
                sx={{ m: 1, width: "60%" }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-new-password">
                  Mật khẩu mới
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-new-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    if (checkPassword) {
                      setCheckPassword(false);
                    }
                    handleChangeProfile({ newPassword: e.target.value });
                  }}
                  value={newPassword}
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
                  label="Mật khẩu mới"
                />
              </FormControl>
              <FormControl
                sx={{ m: 1, width: "60%" }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-reinput-new-password">
                  Nhập lại mật khẩu mới
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-reinput-new-password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    if (checkPassword) {
                      setCheckPassword(false);
                    }
                    handleChangeProfile({ reCheckNewPassword: e.target.value });
                  }}
                  value={reCheckNewPassword}
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
                  label="Nhập lại mật khẩu mới"
                />
              </FormControl>
              {checkPassword && (
                <Typography variant="subtitle2" color={"error.main"}>
                  Mật khẩu mới và nhập lại mật khẩu không khớp!
                </Typography>
              )}
            </CardContent>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: "1rem",
              }}
            ></Box>
          </Collapse>
        </Grid>
      </Grid>
      <Divider sx={{ m: "1rem", width: "90%" }} />
      <Grid item container justifyContent={"center"}>
        <LoadingButton
          loading={isLoading}
          variant="contained"
          disableElevation
          // startIcon={<SaveIcon />}
          sx={{ width: "60%" }}
          onClick={() => {
            updateProfile();
          }}
        >
          Cập Nhật Thông Tin
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default UpdateUserComponent;
