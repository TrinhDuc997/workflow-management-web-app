import { Collapse, Divider, Typography } from "@mui/material";
import React, { useImperativeHandle } from "react";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { ButtonBase } from "@mui/material";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/system";
import AddMaterialComponent from "./AddMaterialComponent";
import UpdateMaterialComponent from "./UpdateMaterialComponent";

const UpdateListMaterial = React.forwardRef((props = {}, ref) => {
  const [expanded, setExpanded] = React.useState(true);
  const [materialLists, setMaterialLists] = React.useState(
    props.materialList || []
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAddMaterial = (params) => {
    setMaterialLists([...materialLists, params]);
  };
  const handleRemoveMateial = (id) => {
    let newMaterial = [];
    materialLists.forEach((i) => {
      if (i._id !== id) {
        newMaterial.push(i);
      }
    });
    setMaterialLists(newMaterial);
  };
  const handleEditMaterial = (params) => {
    let newMaterial = [];
    materialLists.forEach((i) => {
      if (i.id === params.id) {
        newMaterial.push(params);
      } else {
        newMaterial.push(i);
      }
    });
    setMaterialLists(newMaterial);
  };
  useImperativeHandle(
    ref,
    () => ({
      getMaterialList: () => {
        return materialLists;
      },
      setMaterialLists,
    }),
    [materialLists]
  );
  return (
    <Box sx={{ ml: "1rem", mr: "1rem", mb: "1rem" }}>
      <ButtonBase
        sx={{
          p: "5px",
          borderRadius: "10px",
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
          return (
            <UpdateMaterialComponent
              key={item._id}
              index={index}
              handleRemoveMateial={handleRemoveMateial}
              handleEditMaterial={handleEditMaterial}
              dataMaterial={item}
            />
          );
        })}
      </Collapse>
    </Box>
  );
});

export default UpdateListMaterial;
