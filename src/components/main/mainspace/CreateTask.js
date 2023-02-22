import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Collapse,
  Snackbar,
  TextareaAutosize,
  // Modal,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, { useContext, useRef } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { ButtonBase } from "@mui/material";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";
import ListMaterial from "./ListMaterial";
import { usersAPI } from "../../../api/users-api";
import { tasksAPI } from "../../../api";
import moment from "moment";
import { MainContext } from "../../../contexts";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={1} ref={ref} variant="standard" {...props} />;
});

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, unit = "", ...other } = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      suffix={unit}
    />
  );
});

function CreateTask(props) {
  const { handleAddTask } = props;
  const mainState = useContext(MainContext);
  const { selectedDate } = mainState;
  const [expanded, setExpanded] = React.useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [unitPrice, setUnitPrice] = React.useState(0);
  const [listUser, setListUsers] = React.useState([]);
  const materialListComponentRef = useRef();
  const dataFetchedRef = useRef(false);
  const [open, setOpen] = React.useState(false);
  const [retCode, setRetCode] = React.useState(1);
  const refTextFieldTaskName = useRef();
  const [mandatory, setMandatory] = React.useState({
    taskNameIsNull: false,
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSaveTask = async () => {
    const materialList = materialListComponentRef.current.getMaterialList();
    const task = {
      name: taskName,
      status: "todo",
      assignedTo: (assignedTo || {}).id || null,
      description,
      address,
      quantity,
      unitPrice,
      createDate: selectedDate,
      materials: materialList.map((i) => {
        return {
          name: i.materialName,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        };
      }),
    };

    if (!task.name) {
      setMandatory({
        taskNameIsNull: true,
      });
      return;
    }
    console.log("🚀 ~ file: CreateTask.js:74 ~ handleAddTask ~ task", task);
    const saveData = await tasksAPI.addTasks({ listTask: [task] });
    if (saveData.RetCode === 1) {
      handleAddTask((saveData || {}).listTask || []);
      setRetCode(1);
      setOpen(true);
      // handle reset field --- start
      setTaskName("");
      setAssignedTo(null);
      setDescription("");
      setAddress("");
      setQuantity(1);
      setUnitPrice("");
      materialListComponentRef.current.setMaterialLists([]);
      // handle reset field --- end
    } else {
      setRetCode(0);
      setOpen(true);
    }
  };
  // componentDidMount - START
  React.useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchListUser = async () => {
      const usersData = await usersAPI.getListUsers();
      setListUsers((usersData || {}).users || []);
    };
    fetchListUser().catch(console.error);
  }, []);
  //componentDidMount - END
  return (
    <Card sx={{ m: "1rem" }}>
      <ButtonBase
        sx={{
          p: "5px",

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
        <Typography variant="subtitle2">Thêm Thẻ</Typography>
      </ButtonBase>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Nhập tiêu đề công việc"
            multiline
            rows={1}
            sx={{ width: "100%", pb: "1rem" }}
            size="small"
            error={mandatory.taskNameIsNull}
            InputProps={{
              inputComponent: TextareaAutosize,
              inputRef: refTextFieldTaskName,
            }}
            value={taskName}
            onChange={(e) => {
              if (mandatory.taskNameIsNull) {
                setMandatory({
                  taskNameIsNull: false,
                });
              }
              setTaskName(e.target.value);
            }}
          />

          <TextField
            id="outlined-multiline-static"
            label="Thêm mô tả chi tiết hơn"
            multiline
            rows={1}
            maxRows={10}
            sx={{ width: "100%", pb: "1rem" }}
            size="small"
            InputProps={{ inputComponent: TextareaAutosize }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[...listUser]}
            getOptionLabel={(option) => option.fullName}
            sx={{ mb: "1rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Chọn người làm" />
            )}
            value={assignedTo}
            size="small"
            onChange={(event, newValue) => {
              setAssignedTo(newValue);
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Nhập Địa Chỉ"
            multiline
            rows={1}
            sx={{ width: "100%", pb: "1rem" }}
            size="small"
            InputProps={{ inputComponent: TextareaAutosize }}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <TextField
              label="Số lượng"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="standard"
              size="small"
            />
            <TextField
              label="Đơn giá"
              value={unitPrice}
              onChange={(e) => {
                setUnitPrice(e.target.value);
              }}
              name="numberformat"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
                inputProps: {
                  unit: "  VND",
                },
              }}
              variant="standard"
              size="small"
            />
          </Box>
        </CardContent>
        <ListMaterial ref={materialListComponentRef} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: "1rem",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{ width: "80%" }}
            onClick={() => {
              handleSaveTask();
            }}
          >
            Thêm Thẻ
          </Button>
        </Box>
      </Collapse>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
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
    </Card>
  );
}

export default CreateTask;
