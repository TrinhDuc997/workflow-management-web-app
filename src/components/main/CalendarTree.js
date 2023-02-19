import React from "react";
import moment from "moment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Box, Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function generateDataCalendar(year) {
  const daysOfYear = {};
  const startOfYear = moment({ year });

  // Tạo các đối tượng moment cho mỗi ngày trong năm và thêm vào mảng daysOfYear
  for (let i = 0; i < 365; i++) {
    const date = startOfYear.clone().add(i, "days");
    const y = date.year();
    const m = date.month() + 1;
    const d = date.date();

    if (!daysOfYear[y]) {
      daysOfYear[y] = {};
    }

    if (!daysOfYear[y][m]) {
      daysOfYear[y][m] = [];
    }

    daysOfYear[y][m].push(d);
  }
  return daysOfYear;
}

function CalendarTree() {
  const [year, setYear] = React.useState(moment().format("yyyy"));
  const daysOfYear = generateDataCalendar(year);
  const currentDay = moment().format("DD");
  const currentMonth = moment().format("M");
  const [expanded, setExpanded] = React.useState([`Thang${currentMonth}`]);
  const [selected, setSelected] = React.useState([
    `N${currentDay}T${currentMonth}`,
  ]);
  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const monthNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthOfYear = daysOfYear[year];
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="select year"
          openTo="year"
          views={["year"]}
          value={year}
          onChange={(newValue) => {
            setYear(newValue.format("yyyy"));
          }}
          renderInput={({ inputRef, InputProps }) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "35px",
                  border: "1px solid",
                  borderColor: "divider",
                  background: "background.paper",
                  borderRadius: "10px",
                  ml: "10px",
                  mr: "10px",
                  //   "&:hover": {
                  //     backgroundColor: "background.default",
                  //   },
                }}
              >
                <Typography
                  variant="h5"
                  ref={inputRef}
                  sx={{ display: "inline-block", fontWeight: 800 }}
                >
                  {year}
                </Typography>
                {(InputProps || {}).endAdornment}
              </Box>
            );
          }}
        />
      </LocalizationProvider>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
        sx={{
          height: "calc(100vh - 8rem)",
          overflow: "auto",
        }}
      >
        {monthNumber.map((item) => {
          const daysOfMonth = monthOfYear[item] || {}; // get days in month
          return (
            <TreeItem
              key={`Thang${item}`}
              nodeId={`Thang${item}`}
              label={
                <Typography
                  variant="subtitle1"
                  sx={{
                    ml: "5px",
                    mr: "5px",
                  }}
                >{`Tháng ${item}`}</Typography>
              }
              sx={{ borderRadius: "10px", ml: "5px", mr: "5px" }}
            >
              {daysOfMonth.map((subItem) => {
                return (
                  <TreeItem
                    key={`N${subItem}T${item}`}
                    nodeId={`N${subItem}T${item}`}
                    label={`Ngày ${subItem}`}
                    sx={{
                      ml: "5px",
                      mr: "5px",
                    }}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </Box>
  );
}

export default CalendarTree;
