import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authAPI } from "../../api/index.js";
import { useNavigate } from "react-router-dom";

function Login() {
  // handle show password --- START
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // handle show password --- END
  // localStorage.setItem("token", "");

  // handle restart token -- START

  // handle restart token -- END
  //handle Login --- START
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checkLogin, setCheckLogin] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(userName, password, navigate) {
    const loginData = await authAPI.login({ userName, password });
    const { token = "", message = "" } = loginData || {};
    localStorage.setItem("token", token);
    localStorage.setItem("dataUser", JSON.stringify(loginData));
    if (!!token) {
      setCheckLogin(false);
      return navigate("/");
    }
    if (!!message) {
      setCheckLogin(true);
    }
  }
  //handle Login --- END

  return (
    <Box textAlign={"center"}>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        minHeight={"100vh"}
      >
        <Box
          component={"header"}
          minHeight={"10vh"}
          paddingTop={"40px"}
          paddingBottom={"20px"}
        >
          <Grid container>
            <Grid item>
              <img
                style={{ borderRadius: "10px" }}
                width={100}
                height={90}
                alt="logo"
                src="/logo.png"
              />
            </Grid>
            <Grid item sx={{ fontFamily: "" }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "42px",
                  fontWeight: "900",
                  lineHeight: "1",
                  color: "primary.dark",
                }}
              >
                WorkFlow
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "42px",
                  fontWeight: "900",
                  lineHeight: "1",
                  color: "primary.dark",
                }}
              >
                Management
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Container
          sx={{
            minHeight: "75vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Paper sx={{ width: "400px", height: "500px", bgcolor: "#ffffff" }}>
            <Grid
              container
              direction={"column"}
              spacing={2}
              justifyContent={"center"}
            >
              <Grid item mt={2}>
                <Typography
                  variant="h6"
                  color={"primary.dark"}
                  fontWeight={"800"}
                >
                  Đăng Nhập Vào <br /> Workflow Management
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "35ch" }}
                  id="outlined-basic"
                  label="Tên Đăng Nhập"
                  variant="outlined"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mật Khẩu
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    value={password}
                    onKeyDown={(e) => {
                      if (e.code === "Enter") {
                        handleSubmit(userName, password, navigate);
                      }
                    }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
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
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  sx={{ width: "25ch" }}
                  variant="outlined"
                  onClick={() => {
                    handleSubmit(userName, password, navigate);
                  }}
                >
                  Đăng Nhập
                </Button>
              </Grid>
              {checkLogin && (
                <Grid item>
                  <Typography variant="subtitle2" color={"error.main"}>
                    Tài Khoản Hoặc Mật Khẩu Không Chính Xác!
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Button sx={{ mt: "2rem" }} variant="text">
                  Quên Mật Khẩu
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>

        <Box
          component={"footer"}
          minHeight={"10vh"}
          width={"100%"}
          position={"absolute"}
          bottom={0}
          zIndex={"-999"}
          display={{ xs: "none", md: "block" }}
        >
          <Grid container alignItems={"flex-end"}>
            <Grid xs={4} item>
              <img
                src="/images/section1.jpg"
                alt="section"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid xs={4} item></Grid>
            <Grid xs={4} item>
              <img
                src="/images/section2.png"
                alt="section"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default Login;
