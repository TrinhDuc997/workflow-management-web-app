import {
  Autocomplete,
  Card,
  CardContent,
  Collapse,
  Divider,
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
import MaterialComponent from "./MaterialComponent";
import AddMaterialComponent from "./AddMaterialComponent";

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

function ListMaterial() {
  const [expanded, setExpanded] = React.useState(false);
  const [editorState, seteditorState] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [materialLists, setMaterialLists] = React.useState([]);
  const [unitPrice, setUnitPrice] = React.useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEditorStateChange = (value) => {
    seteditorState(value);
  };
  const handleAddMaterial = (params) => {
    setMaterialLists([...materialLists, params]);
  };

  return (
    <Box sx={{ ml: "1rem", mr: "1rem", mb: "1rem" }}>
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
        <Typography variant="subtitle2">
          Thêm Danh Sách Nguyên Vật Liệu
        </Typography>
      </ButtonBase>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <AddMaterialComponent handleAddMaterial={handleAddMaterial} />
        <Divider sx={{ mb: "8px" }} />
        {materialLists.map((item, index) => {
          return <MaterialComponent key={index} dataMaterial={item} />;
        })}
      </Collapse>
    </Box>
  );
}

export default ListMaterial;
