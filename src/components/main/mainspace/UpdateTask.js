import {
  Autocomplete,
  Card,
  CardContent,
  TextareaAutosize,
  // Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useRef } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";
import { tasksAPI } from "../../../api";
import { MainContext } from "../../../contexts";
import UpdateListMaterial from "./UpdateListMaterial";
import { LoadingButton } from "@mui/lab";
import action from "../../../utils/actionCommon";
import { socket } from "../../../socket";

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

const UpdateTask = React.forwardRef((props, ref) => {
  const {
    detailTask = {},
    handleCloseModal,
    setOpenMessage,
    setRetCode,
  } = props;
  // const { roles = [] } = JSON.parse(localStorage.getItem("dataUser") || "{}");
  // const checkPermitEditTask = action.checkPermission(roles, "edit_dashboard");
  const { materials = [], assignedTo: propsAssignedTo = null } = detailTask;
  const mainState = useContext(MainContext);
  const { selectedDate, listUser, handleUpdate } = mainState;
  const [taskName, setTaskName] = React.useState(detailTask.taskName || "");
  const [assignedTo, setAssignedTo] = React.useState(
    !!(propsAssignedTo || {})._id ? propsAssignedTo : null
  );
  const [description, setDescription] = React.useState(
    detailTask.description || ""
  );
  const [address, setAddress] = React.useState(detailTask.address || "");
  const [phoneNumber, setPhoneNumber] = React.useState(
    detailTask.phoneNumber || ""
  );
  const [quantity, setQuantity] = React.useState(detailTask.quantity || "");
  const [unitPrice, setUnitPrice] = React.useState(detailTask.unitPrice || "");
  const [isSave, setIsSave] = React.useState(false);

  const materialListComponentRef = useRef();

  const refTextFieldTaskName = useRef();
  const [mandatory, setMandatory] = React.useState({
    taskNameIsNull: false,
  });

  const handleSaveTask = async () => {
    const materialList = materialListComponentRef.current.getMaterialList();

    const task = {
      taskName,
      status: detailTask.status || "todo",
      assignedTo: (assignedTo || {})._id || null,
      description,
      address,
      phoneNumber,
      quantity,
      unitPrice,
      createDate: selectedDate,
      materials: materialList.map((i) => {
        return {
          materialName: i.materialName,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        };
      }),
    };

    if (!task.taskName) {
      setMandatory({
        taskNameIsNull: true,
      });
      return;
    }
    setIsSave(true);
    const saveData = await tasksAPI.editTask({
      taskId: detailTask._id,
      taskData: task,
    });
    if (saveData.RetCode === 1) {
      handleUpdate(saveData.task);
      socket.emit("task:update", saveData);
      // handle reset field --- end
      setOpenMessage(true);
      setRetCode(1);
      handleCloseModal();
    } else {
      setRetCode(0);
      setOpenMessage(true);
    }
    setIsSave(false);
  };
  const labelsStatus = {
    todo: "Cần làm",
    doing: "Đang làm",
    done: "Làm xong",
  };
  return (
    <Card
      sx={{
        m: "auto",
        mt: "5vh",
        width: { xs: "95%", md: "40%" },
        height: { xs: "80vh", md: "70vh" },
        overflow: "auto",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight={900} mb={"10px"}>
          Công việc trong danh sách <u>{labelsStatus[detailTask.status]}</u>
        </Typography>
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
          isOptionEqualToValue={(option, value) =>
            (option || {})._id === (value || {})._id
          }
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
          label="Nhập địa chỉ của khách"
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
        <TextField
          id="outlined-multiline-static"
          label="Nhập số điện thoại của khách"
          multiline
          rows={1}
          sx={{ width: "100%", pb: "1rem" }}
          size="small"
          InputProps={{ inputComponent: TextareaAutosize }}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <TextField
            label="Số lượng"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            name="quantity"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom,
            }}
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
          <TextField
            label="Đơn giá"
            value={unitPrice}
            onChange={(e) => {
              setUnitPrice(e.target.value);
            }}
            name="unitPrice"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom,
              inputProps: {
                unit: "  VND",
              },
            }}
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
        </Box>
      </CardContent>
      <UpdateListMaterial
        materialList={materials}
        ref={materialListComponentRef}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: "1rem",
          position: "sticky",
          bottom: "1px",
          zIndex: "999",
        }}
      >
        <LoadingButton
          loading={isSave}
          variant="contained"
          disableElevation
          sx={{ width: "80%" }}
          onClick={() => {
            handleSaveTask();
          }}
        >
          Cập Nhật Thẻ
        </LoadingButton>
      </Box>
    </Card>
  );
});

export default UpdateTask;
