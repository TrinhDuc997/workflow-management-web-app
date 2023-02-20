import { ButtonBase, CardContent, TextField } from "@mui/material";
import React from "react";
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

  const handleCheckMandatory = () => {
    if (materialName === "") {
      setIsError(true);
    } else {
      setIsError(false);
      handleAddMaterial({ materialName, quantity, unitPrice });
    }
  };
  const { handleAddMaterial } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <CardContent>
        <TextField
          id="outlined-multiline-static"
          label="Tên Nguyên Vật Liệu"
          multiline
          rows={1}
          value={materialName}
          sx={{ width: "100%", pb: "2px" }}
          size="small"
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
