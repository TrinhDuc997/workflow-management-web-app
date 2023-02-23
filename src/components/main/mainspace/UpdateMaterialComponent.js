import {
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const ViewMaterial = ({
  dataMaterial = {},
  setEditMode,
  handleRemoveMateial,
}) => {
  const { materialName, quantity, unitPrice, id } = dataMaterial;
  return (
    <CardContent sx={{ p: "0px" }}>
      <Paper>
        <Grid
          container
          spacing={2}
          sx={{ m: 0, alignItems: "center", width: "100%" }}
        >
          <Grid sx={{ p: "5px !important" }} xs item>
            <Typography variant="body1">{materialName}</Typography>
          </Grid>
          <Grid
            xs
            item
            container
            direction={"column"}
            sx={{ p: "5px !important" }}
          >
            <Grid item>
              <Typography variant="body1">Số Lượng: {quantity}</Typography>{" "}
            </Grid>
            <Grid item>
              {" "}
              <Typography variant="">
                Đơn Giá: {Number(unitPrice).toLocaleString()} VND
              </Typography>{" "}
            </Grid>
          </Grid>
          <Grid
            xs={1}
            item
            container
            direction={"column"}
            sx={{ padding: "0px !important" }}
          >
            <Grid item>
              <ButtonBase
                sx={{
                  height: "24px",
                }}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <EditIcon
                  sx={{
                    "&:hover": {
                      color: "background.second",
                    },
                  }}
                />
              </ButtonBase>
            </Grid>
            <Grid item>
              <ButtonBase
                sx={{
                  height: "24px",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  handleRemoveMateial(id);
                }}
              >
                <DisabledByDefaultRoundedIcon
                  sx={{
                    "&:hover": {
                      color: "background.second",
                    },
                  }}
                />
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </CardContent>
  );
};

const EditMaterial = (props) => {
  const {
    materialName,
    quantity,
    unitPrice,
    setMaterialName,
    setQuantity,
    setUnitPrice,
    id,
    handleRemoveMateial,
    handleEditChange,
  } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <CardContent sx={{ width: "100%" }}>
        <TextField
          id="outlined-multiline-static"
          label="Tên Nguyên Vật Liệu"
          multiline
          rows={1}
          sx={{ width: "100%", pb: "2px" }}
          size="small"
          value={materialName}
          onChange={(e) => {
            setMaterialName(e.target.value);
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
            variant="standard"
            size="small"
            sx={{ width: "45%" }}
          />
        </Box>
      </CardContent>
      <Box width={"30px"}>
        <ButtonBase
          sx={{
            padding: "5px",
            height: "24px",
            mb: "10px",
          }}
          onClick={() => {
            handleEditChange();
          }}
        >
          <CheckBoxIcon
            sx={{
              "&:hover": {
                color: "background.second",
              },
            }}
          />
        </ButtonBase>
        <ButtonBase
          sx={{
            padding: "5px",
            height: "24px",
            mt: "10px",
          }}
          onClick={() => {
            handleRemoveMateial(id);
          }}
        >
          <DisabledByDefaultRoundedIcon
            sx={{
              "&:hover": {
                color: "background.second",
              },
            }}
          />
        </ButtonBase>
      </Box>
    </Box>
  );
};
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

function UpdateMaterialComponent(props) {
  const { dataMaterial = {}, handleRemoveMateial, handleEditMaterial } = props;
  const [materialName, setMaterialName] = React.useState(
    dataMaterial.materialName || ""
  );
  const [quantity, setQuantity] = React.useState(dataMaterial.quantity || 0);
  const [unitPrice, setUnitPrice] = React.useState(dataMaterial.unitPrice || 0);
  const [editMode, setEditMode] = React.useState(false);

  const handleEditChange = () => {
    setEditMode(false);
    handleEditMaterial({ ...dataMaterial, quantity, unitPrice, materialName });
  };
  return (
    <Box marginLeft={"1rem"}>
      {editMode ? (
        <EditMaterial
          quantity={quantity}
          id={dataMaterial._id || ""}
          setQuantity={setQuantity}
          unitPrice={unitPrice}
          setUnitPrice={setUnitPrice}
          materialName={materialName}
          setMaterialName={setMaterialName}
          handleRemoveMateial={handleRemoveMateial}
          handleEditChange={handleEditChange}
        />
      ) : (
        <ViewMaterial
          dataMaterial={{
            materialName,
            quantity,
            unitPrice,
            id: dataMaterial._id || "",
          }}
          setEditMode={setEditMode}
          handleRemoveMateial={handleRemoveMateial}
        />
      )}
    </Box>
  );
}

export default UpdateMaterialComponent;
