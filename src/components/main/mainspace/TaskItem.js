import { Avatar, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box } from "@mui/system";

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

function TaskItem(props) {
  const { detailTask = {} } = props;
  const {
    name = "",
    assignedTo = {},
    // address,
    // quantity,
    unitPrice,
  } = detailTask;
  const { fullName = "" } = assignedTo || {};
  return (
    <Paper sx={{ mb: "1rem" }}>
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

          <IconButton
            sx={{ p: "0px", width: "40px", height: "40px" }}
            aria-label="detail"
            size="large"
          >
            <MoreHorizIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid item container sx={{ p: "8px" }}>
          <Grid xs direction={"column"} item container>
            <Grid item>{name}</Grid>
            {/*<Grid item>{address}</Grid>*/}
          </Grid>
          <Grid xs direction={"column"} item container>
            <Grid item container direction={"column"}>
              {/*<Grid item container justifyContent={"space-between"}>
                <Typography variant="body1">Số Lượng:</Typography>
                <Typography variant="body1">{quantity}</Typography>
              </Grid>*/}
              <Grid item container justifyContent={"space-between"}>
                <Typography variant="body1">Giá:</Typography>
                <Typography variant="body1">{unitPrice} VND</Typography>
              </Grid>
              {/*<Grid item container justifyContent={"space-between"}>
                <Typography variant="body1"></Typography>
                <Typography variant="body1">
                  {Number(unitPrice) * Number(quantity)} VND
                </Typography>
            </Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TaskItem;
