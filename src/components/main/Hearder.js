import { ButtonBase, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountMenu from "../common/AccountSetting";
import { useNavigate } from "react-router-dom";

function Hearder(props) {
  const navigate = useNavigate();
  async function handleGoToMain() {
    return navigate("/");
  }

  async function viewProfile() {
    return navigate("/admin");
  }
  const { theme, colorMode } = props;
  return (
    <Fragment>
      <Grid item sx={{ textAlign: "center" }}>
        <a
          onClick={() => {
            handleGoToMain();
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            style={{
              borderRadius: "5px",
              marginLeft: "20px",
              marginRight: "10px",
            }}
            width={45}
            height={40}
            alt="logo"
            src={
              localStorage.getItem("prevMode") === "dark"
                ? "/logo2.png"
                : "/logo.png"
            }
          />
          <Typography
            variant="h4"
            sx={{
              fontSize: "21px",
              fontWeight: "900",
              lineHeight: "1",
              color: "text.textColor",
              display: "inline-block",
            }}
          >
            WORKFLOW <br /> MANAGEMENT
          </Typography>
        </a>
      </Grid>
      <Grid item></Grid>
      <Grid item>
        <Grid container>
          <Grid item p={"5px"}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode.toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Grid>
          <Grid item>
            <AccountMenu />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default Hearder;
