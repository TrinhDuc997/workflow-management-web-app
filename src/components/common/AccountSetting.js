import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import action from "../../utils/actionCommon";

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

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  async function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("dataUser");
    return navigate("/login");
  }

  async function viewProfile(viewPanel) {
    return navigate("/admin", { state: { showPanelSelected: viewPanel } });
  }

  const { fullName = "", roles = [] } = JSON.parse(
    localStorage.getItem("dataUser") || "{}"
  );
  const checkPermitAddUser = action.checkPermission(roles, "add_dashboard");
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: stringToColor(fullName),
                color: invertColor(stringToColor(fullName)),
              }}
            >
              {stringAvatar(fullName)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Xin Chào {fullName}</MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            viewProfile("VIEWPROFILE");
          }}
        >
          <Avatar sx={{ bgcolor: stringToColor(fullName) }} /> Thông Tin Cá Nhân
        </MenuItem>
        {checkPermitAddUser && (
          <MenuItem
            onClick={() => {
              viewProfile("USERMANAGE");
            }}
          >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Thêm Tài Khoản
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleLogout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng Xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
