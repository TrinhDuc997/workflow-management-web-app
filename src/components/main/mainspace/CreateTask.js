import {
  Autocomplete,
  Card,
  CardContent,
  Collapse,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { ButtonBase } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";
import ListMaterial from "./ListMaterial";

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

function CreateTask() {
  const [expanded, setExpanded] = React.useState(false);
  const [editorState, seteditorState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quantity, setQuantity] = React.useState(1);
  const [unitPrice, setUnitPrice] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditorStateChange = (value) => {
    seteditorState(value);
  };
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
          />

          <TextField
            id="outlined-multiline-static"
            label="Thêm mô tả chi tiết hơn"
            multiline
            rows={1}
            sx={{ width: "100%", pb: "1rem" }}
            onClick={() => {
              handleOpen();
            }}
            size="small"
          />

          <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
          >
            <Box
              sx={{
                width: "50%",
                height: "60%",
                background: "white",
                borderRadius: "15px",
                position: "absolute",
                top: "20%",
                left: "25%",
              }}
            >
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                wrapperStyle={{
                  height: "70%",
                }}
                toolbarStyle={{
                  borderRadius: "10px",
                }}
                onEditorStateChange={handleEditorStateChange}
              />
            </Box>
          </Modal>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={["cần làm", "đang làm", "làm xong"]}
            sx={{ mb: "1rem" }}
            renderInput={(params) => (
              <TextField {...params} label="Chọn người làm" />
            )}
            size="small"
          />
          <TextField
            id="outlined-multiline-static"
            label="Nhập Địa Chỉ"
            multiline
            rows={1}
            sx={{ width: "100%", pb: "1rem" }}
            size="small"
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
        <ListMaterial />
      </Collapse>
    </Card>
  );
}

export default CreateTask;
