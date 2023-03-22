import * as React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Person from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import action from "../../utils/actionCommon";

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

export default function LeftMenu(props) {
  const { setShowPanel, handleDrawerClose } = props;
  const { fullName = "", roles = [] } = JSON.parse(
    localStorage.getItem("dataUser") || "{}"
  );

  const checkPermitAddUser = action.checkPermission(roles, "add_dashboard");
  return (
    <MenuList sx={{ mt: "40px" }}>
      <MenuItem
        onClick={() => {
          setShowPanel("VIEWPROFILE");
          if (window.innerWidth < 900) {
            handleDrawerClose();
          }
        }}
      >
        <Avatar sx={{ bgcolor: stringToColor(fullName) }} />{" "}
        <Typography variant="body1" ml={"10px"}>
          {fullName}
        </Typography>
      </MenuItem>
      {checkPermitAddUser && (
        <MenuItem
          onClick={() => {
            setShowPanel("USERMANAGE");
            if (window.innerWidth < 900) {
              handleDrawerClose();
            }
          }}
          sx={{ pl: "30px" }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Quản Lý Tài Khoản
        </MenuItem>
      )}
    </MenuList>
  );
}
