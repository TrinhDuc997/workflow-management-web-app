import { ButtonBase, CardContent, TextField } from "@mui/material";
import React, { useRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";
import AddBoxIcon from "@mui/icons-material/AddBox";

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

function AddMaterialComponent(props) {
  const [materialName, setmaterialName] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [unitPrice, setUnitPrice] = React.useState(0);
  const [isError, setIsError] = React.useState(false);
  const refTextFieldMaterialName = useRef();
  const handleCheckMandatory = () => {
    if (materialName === "") {
      setIsError(true);
    } else {
      setIsError(false);
      handleAddMaterial({ _id: Date.now(), materialName, quantity, unitPrice });
      setmaterialName("");
      setQuantity(1);
      setUnitPrice("");
      refTextFieldMaterialName.current.focus();
    }
  };
  const { handleAddMaterial } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <CardContent sx={{ width: "100%" }}>
        <TextField
          id="outlined-multiline-static"
          label="Tên nguyên vật liệu"
          multiline
          rows={1}
          value={materialName}
          sx={{ width: "100%", pb: "2px" }}
          size="small"
          InputProps={{
            inputRef: refTextFieldMaterialName,
          }}
          error={isError}
          onChange={(e) => {
            setIsError(false);
            setmaterialName(e.target.value);
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
            sx={{ width: "45%" }}
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
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleCheckMandatory();
              }
            }}
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
        </Box>
      </CardContent>
      <ButtonBase
        sx={{
          mb: "16px",
          padding: "5px",
          height: "24px",
        }}
        onClick={() => {
          handleCheckMandatory();
        }}
      >
        <AddBoxIcon
          sx={{
            "&:hover": {
              color: "background.second",
            },
          }}
        />
      </ButtonBase>
    </Box>
  );
}

export default AddMaterialComponent;
